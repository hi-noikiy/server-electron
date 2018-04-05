/**
 * 该控制器为所有服务登陆认证等业务 
 */
const proxy = require('./../proxy/mysql');
const User = proxy.admin;
const cryptoHelper = require('./../utils/cryptoHelper');
const Token = require('./../utils/token');
const redisKeys = require('./../configs/redisKeys');
const logger = require('./../utils/logger')
const UserAuth = require('./../servers/auth');
// 请求登陆
/**
 * @api {post} /auth/v1.0/E001-001/login 请求登陆
 * @apiVersion 1.0.0
 * @apiName login
 * @apiGroup auth
 * 
 * @apiParam {String} [type=0] 登陆类型，没有这个类型的时候注册完成时重定向到首页.
 * @apiParam {String} username 登陆账号.
 * @apiParam {String} password 登陆密码.
 * @apiDescription 所有的登陆验证都在这个接口进来
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username":"zhengchong",
	     "password":"123456"
 *     }
 * @apiSuccess {Boolen} success 成功标识.
 * @apiSuccess {String} access_token  token验证.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhNGUzYWYzNTU1NTZmNmVhYzk3ZWQ3ZiIsInVzZXJuYW1lIjoiemhlbmdjaG9uZyIsIm5pY2tuYW1lIjoi6YOR5bSHIn0.EgCt35m9gUjDfOT0Az0gzXx9MBHJnOfYcxTDuDJRbpk"
 *     }
 * @apiError UserNotFound The <code>password</code> of the password was error.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 Not Found
 *     {    
 *       "success": false
 *       "error": "password error"
 *     }
 */
exports.login = async (ctx) => {
    const data = ctx.request.body;
    let {username,password} = data;
    password = cryptoHelper.SHA1(password);
    try { 
        let _user = await User.findOne({ username: username, pwd: password });
        console.log(_user.agencies.dataValues)
        if (_user) {
            _user.agencies = _user.agencies ? _user.agencies.dataValues : {};
            let userAuth = new UserAuth(_user);
            await userAuth.saveStatus();
            if (_user.type) { 
                ctx.response.body={
                    success: true,
                    access_token: userAuth.token,
                    data: _user
                };
            } else {       
                // 重定向到主页
                ctx.cookies.set('token', userAuth.token, { maxAge: 10000 });
                ctx.redirect('/')
            }
        }else{
            ctx.response.body={
                success: false,
                "error": "password error"
            }
        }
    } catch (e) {
        console.log(e)
        ctx.response.body = {
            success: false,
            "error": "error",
            message:e
        }
    };
}

/**
 * @api {post} /auth/v1.0/E001-001/signup[/client] 注册用户
 * @apiVersion 1.0.0
 * @apiName signup
 * @apiGroup auth
 * 
 * @apiParam {String} username 登陆账号.
 * @apiParam {String} password 登陆密码.
 * @apiParam {String} email 注册邮箱.
 * @apiParam {String} phone 注册手机.
 * @apiParam {Number} [type=0] 注册类型. 0 为webpage 注册进来用户 1 为客户端应用注册进来用户 2 为微信用户
 * @apiParam {Array} [auth=0] 用户权限.
 * @apiDescription 所有的登陆验证都在这个接口进来
 * @apiParamExample {json} Request-Example:
 * {
 *      "username":"zhengchong1",
        "password":"3444",
        "email":"z1c@qq.com",
        "phone":"1342380547311",
        "type":"client",
        "auth":[0,2]
 *  }
 * @apiSuccess {Boolen} success 成功标识.
 * @apiSuccess {Object} data 返回用户信息.
 * @apiSuccess {String} [access_token] token验证.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {
                "user_id": "5a54434cfadd001fbc3cb4b5",
                "username": "zhengchong1",
                "email": "z1c@qq.com",
                "phone": "1342380547311",
                "auth":[0,2]
            }
 *     }
 * @apiError UserNotFound The <code>username</code> 用户名重复.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 ok
 *     {    
 *        "success": false,
          "message": "E11000 duplicate key error collection: z_chong.users index: username_1 dup key: { : \"zhengchong1\" }",
          "code": 4001
 *     }
 */
exports.signup = async (ctx)=>{
    const data = ctx.request.body;
    try {
        // 检测邮箱密码用户名
        let { password } = data || '';
        data.pwd = cryptoHelper.SHA1(password);
        data.user_id = cryptoHelper.UUID();
        data.auth = data.auth || 40;
        const result = await User.addUser(data);
        if (result.success) {
            delete data.password;
            let userAuth = new UserAuth(data);
            userAuth.saveStatus()
            if (data.type) {
                ctx.response.body = {
                    success:true,
                    data: userAuth.user,
                    access_token: userAuth.token
                };
            } else {
                 // 重定向到主页
                ctx.cookies.set('token', userAuth.token, { maxAge: 10000 })
                ctx.redirect('/');
            }
        } else {
            ctx.body = {
                success: false,
                message: e || '',
                code: 4002
            };
        }
    } catch (e) {
        ctx.body = {
            success:false,
            message:e ||'',
            code:4002
        };
    }
}

// 下线请求
/**
 * @api {post} /auth/v1.0/E002-001/offline 下线请求
 * @apiVersion 1.0.0
 * @apiName offline
 * @apiGroup auth
 * 
 * @apiParam {String} access_token token.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhNTQ1OThhNjY2OGRiNjg5MDAwNGE0NSIsInR5cGUiOjEsImVtYWlsIjoiejFjQHFxLmNvbSIsInBob25lIjoiMTM0MjM4MDU0NzMxcTEiLCJ1c2VybmFtZSI6InpoZW5nY2hvbmcxIn0.To6yKntvR2vNQv7eMVfycrSaUeFNWKFg4TLHDWvL6mg"
 *     }
 * @apiSuccess {Boolen} success 成功标识.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 ok
 *     {    
 *       "success": false
 *     }
 */
exports.offline = async (ctx) => {
    const user = ctx.request.api_user;
    const access_token = ctx.request.body.access_token || ctx.request.query.access_token; ; 
    const user_id = ctx.request.api_user.id;
    const userStatus = redisKeys.onlieStatus();
    let tokenKey = null;
    if (user.type) {
        tokenKey = redisKeys.apiToken();
    } else {
        tokenKey = redisKeys.webToken();
    }
    let conmand = [];
    conmand.push(['hdel', userStatus, user_id])
    conmand.push(['hdel', tokenKey, access_token]);
    let _result = {};
    await app.redisClient.mutli(conmand).then(data => {
        _result.success = true;
    }).catch(e => {
        _result.success = false;
    })
    ctx.body = _result;
}

// 检测邮箱、手机、用户名是否重复
/**
 * @api {post} /auth/v1.0/E001-001/checkauth 检测重复
 * @apiVersion 1.0.0
 * @apiName checkauth
 * @apiGroup auth
 * 
 * @apiParam {String} [username] 检测的用户名.
 * @apiParam {String} [email] 邮箱.
 * @apiParam {String} [phone] 手机号.
 * @apiParamExample {json} Request-Example:
 *     {
 *          "username":"z2c221a11",
 *          "email" : "z1c@qq.com",
 *          "phone" : "134238054731q1"
 *     }
 * @apiSuccess {Boolen} success 成功标识.
 * @apiSuccess {Boolen} [type] 是否可用.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "username": true,
 *        "email": false,
 *        "phone": false,
 *        "success": true
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 ok
 *     {    
 *       "success": false
 *     }
 */
exports.checkAuth = async (ctx) => {
    const data = ctx.request.body || {};
    ctx.body = {}; 
    try {
        // for (let key in data) {
        //     let user  = null;
        //     let where = {};
        //     where[key] = data[key];
        //     user = await User.findOne(where);
        //     if (user) {
        //         ctx.body[key] = false;
        //     } else {
        //         ctx.body[key] = true;
        //     }
        // };
        const user = await User.sp_check(data);
    } catch (e) {
        console.log(e)
        logger.log(e)
        return ctx.body.success = false;
    }
    ctx.body.success = true;
}