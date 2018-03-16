# server-electron
### 这个项目由于女朋友是个钢琴专业教育工作者，明年打算开个琴行，做为程序员的男朋友总感觉在自己能力上要为她做点什么。
### 这个系统主要分三个部分：
#### 一、接入琴行微信公众号，
#### 二、琴行的web官网主页、
#### 三、琴行内部管理系统（桌面应用）
#### 四、待以上弄完之后，后面也许会接入手机app等

## 服务端

* redis 缓存 

* mysql 数据库

* mongodb 数据库

* log4js 做日志

* 使用es7 async/await 语法

*  weixin 等第三方接入

#### 文件目录结构

```
├── bin  // pm2 启动脚本文件
│   ├── index.js
│   └── pm2.json
├── client  // pc 桌面应用文件
│   └── src
├── servers  // 服务端文件
│   ├── configs
│   │   ├── config.default.js // 开发环境基础配置文件
│   │   ├── config.prod.js // 生成环境配置文件
│   │   ├── index.js // 配置文件
│   │   ├── losgConfig.js // log配置文件
│   │   └── redisKeys.js  // redis key 之统一管理
│   ├── controller
│   │   ├── auth.js
│   │   ├── api.js
│   │   ├── page.js
│   │   └── wx.js
│   ├── models
│   │   ├── userModel.js
│   │   ├── visitorModel.js
│   │   └── index.js
│   ├── proxy
│   │   ├── index.js
│   │   ├── user.js
│   │   └── visitor.js
│   ├── middlewares
│   │   ├── check_code.js
│   │   ├── index.js
│   │   ├── xmlPaser.js
│   │   └── wxToken.js
│   ├── utils
│   │   ├── commonHelper.js
│   │   ├── cryptoHelper.js
│   │   ├── mongodbHelper.js
│   │   ├── redisHelper.js
│   │   ├── token.js
│   │   ├── wxResTemp.js
│   │   └── xmlTool.js
│   └── routers  // router 文件
│       ├── api.js
│       ├── auth.js
│       └── index.js
├── tool
├── app.js  // 服务端启动文件
├── README.md
└── package.json
```
#### 开发环境启动
```
$ cd client
$ npm i
$ npm run dev
```

#### 测试
```
$ npm run test
```
#### 部署生成环境 pm2启动
config.prod.js 配置会替换开发环境配置
```
$ npm i
$ npm run start
```
#### 输出文档 
文档 apidoc自动生成工具 http://apidocjs.com/
```
$ apidoc -i servers/controllers -o apidoc/

```
访问：http://localhost:3000/static/index.html 查看文档

### 内网穿墙工具
   由于微信开发环境中需要与远程的微信服务器进行通信，那么需要一个工具将内网的本地服务器能被外网访问，这里使用的是ngrok 
   官网地址：https://ngrok.com/download
   启动服务器之后，打开终端
   ```
   $ cd tool
   $ ngrok http 3000 
   ```
### 路由分发、权限、token的管理
#### 路由分发    
   创建四个子路由，分别webpage、wx、api接口、统一权限登录验证路由，如果后续要继续开发更多路由，则在这里继续增加子路由，也可以在子路由下面继续增加子路由。
   api、统一权限登录验证路由前面加入版本号控制及路由类型

   ```
    //router/index.js
    // 加入版本号前缀
    _version([api,auth],'/v1.0/:router');

    // 转发路由
    // web page 路由
    router.use('/', page.routes(), page.allowedMethods());

    // 后台系统api 接口
    router.use('/api', api.routes(), api.allowedMethods());

    // 前台 后台登陆认证接口
    router.use('/auth', auth.routes(), auth.allowedMethods());

    // 微信公众号接口
    router.use('/wx', wx.routes(), wx.allowedMethods());

    // 加入版本号前缀
    function _version(routers,url){
        if(!Array.isArray(routers)){
            console.error('the routers must be array');
            return false; 
        }
        const _url = url || '/'
        routers.forEach(function(el){
            if( el instanceof Router ){
                el.prefix(_url)
            }
        })
    }

   ```

#### token检测、权限认证    
   在api 路由中,加入token、权限检测中间件，由于有些api中无效token或者权限检测的，在配置文件中定义俩个无token验证及权限检测的路由
    当遇到这俩个特定路由的时候，直接跳过检测，为了防止伪造免检测路由，在接口路由中加入一层检测是否有伪造的可能

   ```
    // configs/config 文件
    router:{
        unverifyToken: 'E001', // 免验证token路由
        unverifyAuth:'A001' // 免验证权限路由
    }
    // routers/api.js 文件
    "use strict"
    // 加入token验证
    router.use('/',middleware.checkToken);
    router.use('/',middleware.checkAuth);
    router.post('/type', middleware.isToken, middleware.isAuth, index.api);
    router.post('/untoken', middleware.isAuth, index.api);
    router.post('/unauth', middleware.isToken, index.api);

    // middleware/check_code.js
    // 是否需要权限
    exports.isAuth = async (ctx, next) => {
        if (_getRouter(ctx.params.router)[1] !== router.unverifyAuth) { 
            await next();
        } else {
            ctx.response.body = {
                success: false,
                message: 'void Auth'
            }
        }
    }

   ```

#### 调用存储过程   
   在代理模块直接调用存储过程 
   数据转成xml格式传入存储过程的方法中
   ```

    // 调用示例
    var xml = `<Action action="10">
                <data>
                    <username>zhengc222eh111ong1</username>
                    <password>641e2b8105b69fff4d2346d902ec6b0b07c01e51</password>
                    <email>zw32321211c@qq.com</email>
                    <nickname>z_cw232h232ong</nickname>
                    <phone>132321214238110547311</phone>
                    <type>1</type>
                    <auth>0</auth>
                    <user_id>dadd467281014a099cfce525450346e3</user_id>
                </data>
                </Action>`
    mysql.query(CALL sp_addUser(`${xml}`);

    //proxy/user.js
    exports.sqlAddUser = async (users) => {
        var xml = sqlToXml({data:users})
        return new Promise(function (resolve, reject) {
            mysql.query(`CALL sp_addUser(${xml});`, function (err, docs) {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            })
        })
    }

   ```

## pc桌面应用

#### 登陆框

<img src='./views/TIM截图20180113101437.png' width=580 height=302 />

#### 主功能系统区

<img src='./views/TIM截图20180114011918.png' width=1587 height=600 />

* nodb 做本地数据库 

* vue-electron vue集成electron 脚手架

* element-ui 前端ui库

* vuex 状态管理

* vue-router 路由管理

#### 文件目录结构 client文件

`````
├── client
│   └── src
|       ├── main  // 主进程文件
|       |   ├── configs
|       |   ├── ipc // ipc 通讯模块
|       |   ├── utils // 工具库
|       |   ├── store // 数据统一管理
|       |   ├── index.js 
|       |   └── index.dev.js
|       ├── renderer  // 渲染进程文件
|       |   ├── assets // 渲染进程共享资源文件
|       |   ├── login  // 登陆窗体渲染进程
|       |   └── mainRenderer  // 主渲染进程
|       ├── apiUrl.js // api 配置文件，俩个进程共享 
|       ├── index.ejs // 渲染进程模板文件
|       └── ipcCfg.js // 主进程与渲染进程 ipc 通讯 共享 channel
├── README.md
└── package.json
`````
#### 开发环境启动
`````
$ npm i
$ npm run dev
`````
#### 主进程与渲染进程通讯
该应用最为复杂的就是关于主进程与渲染进程之间的通讯，还有当多个渲染进程的时候如何在俩个或多个渲染进程之间通讯
通讯有主动方式也有被动的方式，在electron 进程中主要的通讯还是ipc 主进程用ipcMain 渲染进程是ipcRenderer.
在这里主要还是用ipc 发送/接收信号(channel)的方式进行，为了更好的统一管理信号，所有的信号都统一在ipcCfg.js注册，然后主进程中在ipc文件夹里面进行处理，
在渲染进程中，如果有用到vuex的进程那么统一在store中作为发送接收处理通道。

#### 应用打包
```
$ yarn run build  // 不要用npm 用npm 会报错

```

