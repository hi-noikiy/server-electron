const router = require('./../configs/config').router; 
const redisKeys = require('./../configs/redisKeys');
const config = require('./../configs/config');
const Token = require('./../utils/token');

//  检验token 是否有效
exports.checkToken = async (ctx,next)=>{
    const access_token = ctx.request.body.access_token || ctx.request.query.access_token; 
    if (_getRouter(ctx.params.router)[0] !== router.unverifyToken) {
        console.log('需要验证token')
        var key = redisKeys.apiToken();
        let signature = null, expTime = null, nowTime = Date.now();
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
                await app.redisClient.hset(key, access_token, { signature: signature, expTime: nowTime});
                ctx.request.api_user = user;
                next()
            } catch (e) {
                ctx.response.body = {
                    success: false,
                    message: 'void token'
                }
            }
        } else {
            // 删除过期token
            signature && app.redisClient.hdels(key, access_token);
            ctx.response.body = {
                success:false,
                message:'void token'
            }
        }
    } else {
        console.log('不需要验证token')        
        await next();
    }
}

// 权限认证 
exports.checkAuth = async (ctx, next) => {
    if (_getRouter(ctx.params.router)[1] !== router.unverifyAuth) {
        if (true) {
            console.log('需要权限认证')
            await next();
        } else {
            ctx.response.body = {
                success: false,
                message: 'void Auth'
            }
        }
    } else {
        console.log('不需要权限认证')
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