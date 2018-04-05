/**
 * 该控制器web 网页业务逻辑
 */
const Token = require('./../utils/token');
const logger = require('./../utils/logger');
const redisKeys = require('./../configs/redisKeys');
const middleware = require('./../middleware');

const RedisMongodb = require('./../lib/redisModb');
exports.index = async(ctx)=>{
    const access_token = ctx.cookies.get('token');
    var key = redisKeys.webToken();
    var pid = process.pid;

    if (access_token) {
        const user = await middleware.getTokenUser(key, access_token);
    };

    ctx.body = 'page';
} 

