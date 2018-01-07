const Koa = require('koa');
const configs = require('./configs/config');
const koaBody = require('koa-body')
const app = new Koa();
const router = require('./servers/routers');
const log4js = require('koa-log4')
const okeys = require('./configs/redisKeys');
app.use(log4js.koaLogger(log4js.getLogger("http"), { level: 'auto' }));

global.app = {};
global.app.okeys = okeys;

app.use(koaBody());

//  引入mongoose
const MongoDb = require('./servers/utils/mongodbHelper');
const db = null;
new MongoDb(configs.mongodb).db().then(function(db){
  db = db;
});

//  引入redis
const Redis = require('./servers/utils/redisHelper');

//建立一个reidis 实例 然后挂载到全局
const redisClient = new Redis({url:configs.redis.host + configs.redis.port});
redisClient.connect();
global.app.redisClient = redisClient;

// 最后挂载路由到app
app.use(router.routes());
app.use(router.allowedMethods())

process.on('uncaughtException', function (e) {
  console.error('uncaughtException from process', e);
});
app.listen(configs.server.port)
