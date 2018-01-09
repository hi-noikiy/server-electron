const Koa = require('koa');
const configs = require('./servers/configs/config');
const koaBody = require('koa-body')
const path = require('path');
const serve = require('koa-static2');
const app = new Koa();
const router = require('./servers/routers');

//log工具
const logger = require('./servers/middleware/logger');
// logger
app.use(logger);

global.app = {};

app.use(koaBody());

app.use(serve("static", __dirname + "/views"));

// 开发环境部署文档
if (process.env.NODE_ENV != 'production') {
  app.use(serve("static", __dirname + "/apidoc"));
}
//  引入mongoose
const MongoDb = require('./servers/utils/mongodbHelper');
const db = null;
new MongoDb(configs.mongodb).db().then(function(db){
  db = db;
});

//  引入redis
const Redis = require('./servers/utils/redisHelper');

//建立一个reidis 实例 然后挂载到全局
const redisClient = new Redis({ url: configs.redis.host + configs.redis.port, option: { db: 0 } });
redisClient.connect();
global.app.redisClient = redisClient;

// 设置允许跨域
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.headers.origin); // 
  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
  await next();
});


// 最后挂载路由到app
app.use(router.routes());
app.use(router.allowedMethods())

process.on('uncaughtException', function (e) {
  console.error('uncaughtException from process', e);
});

app.listen(configs.server.port)
