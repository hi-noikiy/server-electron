# server-electron

* redis 做缓存 

* mongodb 做数据库

* log4js 做日志

* 使用es7 async/await 语法

*  weixin 等第三方接入
## 服务端
#### 文件目录结构

```
├── bin
│   ├── index.js
│   └── pm2.json
├── client
│   └── src
├── servers
│   ├── configs
│   │   ├── config.js
│   │   └── redisKeys.js
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
│   └── routers
│       ├── api.js
│       ├── auth.js
│       └── index.js
├── tool
├── app.js
├── README.md
└── package.json
```
#### 开发环境启动
```
$ npm i
$ npm run dev
```
#### pm2启动
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

## pc桌面应用

* nodb 做本地数据库 

* vue-electron vue集成electron 脚手架

* element-ui 前端ui库

#### 文件目录结构 client文件

`````
├── client
│   └── src
|        ├── main
|        |   ├── configs
|        |   ├── ipc
|        |   ├── utils
|        |   ├── index.js
|        |   └── index.dev.js
|        ├── renderer
|        |   ├── assets
|        |   ├── login
|        |   └── mainRenderer
|        ├── index.ejs
|        └── ipcCfg.js
├── README.md
└── package.json
`````
#### 开发环境启动
`````
$ npm i
$ npm run dev
`````
#### 主进程与渲染进程通讯
