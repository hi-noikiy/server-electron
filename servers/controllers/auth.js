/**
 * 该控制器为所有服务登陆认证等业务 
 */
const proxy = require('./../proxy');
const User = proxy.User;
const cryptoHelper = require('./../utils/cryptoHelper');
const Token = require('./../utils/token');
const redisKeys = require('./../configs/redisKeys');

// 请求登陆
exports.login = async (ctx)=>{
    const data = ctx.request.body;
    let {username,password} = data;
    password = cryptoHelper.SHA1(password);
    let _user = await User.findOne({username:username});
    if (_user && password === _user.password) {
        var obj = {
            id: _user.id,
            username: _user.username,
            nickname: _user.nickname
        };
        var nowTime = Date.now();
        const token = Token.newToken(JSON.stringify(obj), String(nowTime));
        var key = redisKeys.apiToken();
        await app.redisClient.hset(key, token, { signature: nowTime, expTime: nowTime});
        ctx.cookies.set('token', token,{ maxAge :10000 })
        ctx.response.type='application/json';
        ctx.response.body={
            success: true,
            access_token:token
        };
    }else{
        ctx.response.type='application/json';
        ctx.response.body={
            success:false
        }
    }
}

// 注册
exports.signup = async (ctx)=>{
    const data = ctx.request.body;
    try{
        let{ password }  = data || '';
        data.password = cryptoHelper.SHA1(password);
        const user = await User.save(data);
        ctx.response.body = {
                success:true,
                data:user._id
            };
    }catch(e){
        ctx.body = {
            success:false,
            message:e.errmsg ||'',
            code:4001
        };
    }


}

// 下线请求
exports.offline = async () => {
        
}