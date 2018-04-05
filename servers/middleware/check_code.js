const router = require('./../configs').router; 
const redisKeys = require('./../configs/redisKeys');
const config = require('./../configs');
const Token = require('./../utils/token');

//  检验token 是否有效
exports.checkToken = async (ctx, next) => {
    const access_token = ctx.request.body.access_token || ctx.request.query.access_token; 
    
    if (_getRouter(ctx.params.router)[0] !== router.unverifyToken) {
        var key = redisKeys.apiToken();
        var user = await exports.getTokenUser(access_token, key);
        if (user) {
            ctx.request.api_user = user;
            await next();
        } else {
            ctx.response.body = {
                success:false,
                message:'void token'    
            }
        }
    } else {     
        await next();
    }
}

// 解析token 内容
exports.getTokenUser = async (access_token,key)=>{
    const _key = key || redisKeys.apiToken();
    let signature = null, expTime = null, nowTime = Date.now(), _data = null;
    if (!access_token) return _data;
    await app.redisClient.hgetVal(key, access_token).then(data => {
        signature = data.signature;
         expTime = data.expTime;
    }).catch(e => {
        signature = null;
        });
    if (signature && expTime && (nowTime - expTime) < config.InvalidTime.apitoken) {
        try {
            const user = await Token.tokenVerify(access_token, String(signature));
            // 更新token过期时间
            await app.redisClient.hset(key, access_token, { signature: signature, expTime: nowTime });
            _data = user;
        } catch (e) {
             _data = null;
        }
    } else {
         // 删除过期token
        signature && app.redisClient.hdels(key, access_token);
        _data = null;
    }
    return _data;
}

// 权限认证 
exports.checkAuth = async (ctx, next) => {
    var auth = _getRouter(ctx.params.router)[1];
    var userAuth = Number(ctx.request.api_user.auth);
    if (auth != router.unverifyAuth) {
        if (userAuth>Number(auth)) { 
            await next();
        } else {
            ctx.response.body = {
                success: false,
                message: 'void Auth'
            }
        }
    } else {
        await next();
    }
}

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

// 是否需要token
exports.isToken = async (ctx, next) => {
    if (_getRouter(ctx.params.router)[0]!==router.unverifyToken) {
        await next();
    } else {
        ctx.response.body = {
            success: false,
            message: 'void token'
        }
    }
}

function _getRouter(_router) {
    if (_router && typeof _router == 'string') {
        return _router.split('-') || [];
    } else {
        return [];
    }
}