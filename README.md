# server-electron

#### 开发环境启动
1. 服务端
```
$ npm i
$ npm run dev
```
#### pm2启动
```
$ npm i
$ npm run start
```
### 路由分发、权限、token的管理
#### 路由分发    

#### token检测、权限认证

### 内网穿墙工具
   由于微信开发环境中需要与远程的微信服务器进行通信，那么需要一个工具将内网的本地服务器能被外网访问，这里使用的是ngrok 
   官网地址：https://ngrok.com/download
   启动服务器之后，打开终端
   ```
   $ cd tool
   $ ngrok http 3000 
   ```
