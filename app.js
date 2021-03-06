const Koa = require('koa');
const configs = require('./servers/configs');
const koaBody = require('koa-body')
const path = require('path');
const serve = require('koa-static2');
const App = new Koa();


//log工具
const logger = require('./servers/middleware/logger');
// logger
App.use(logger);

global.app = {};

App.use(koaBody());

App.use(serve("static", __dirname + "/public"));

// 开发环境部署文档
if (process.env.NODE_ENV !== 'production') {
  App.use(serve("static", __dirname + "/apidoc"));
}

//  加载mongoose
const MongoDb = require('./servers/utils/mongodbHelper');
const db = null;
new MongoDb(configs.mongodb).db().then(function(db){
  db = db;
});

//  引入redis mysql
const Redis = require('./servers/utils/redisHelper');
const mysql = require('./servers/utils/mysqlHelper');
const sequelizeHelper = require('./servers/utils/sequelizeHelper');
global.app.sequelizeHelper = sequelizeHelper;
// require('./servers/models/mysql')

//建立一个reidis 实例 然后挂载到全局
const redisClient = new Redis({ url: configs.redis.host + configs.redis.port, option: { db: 0 } });
redisClient.connect();
global.app.redisClient = redisClient;

// 设置允许跨域
App.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
  await next();
});


const router = require('./servers/routers');
// 最后挂载路由到app
App.use(router.routes());
App.use(router.allowedMethods())

process.on('uncaughtException', function (e) {
  console.error('uncaughtException from process', e);
});

const server = App.listen(configs.server.port);

// require('./servers/utils/qiniuHelper')

module.exports = server;