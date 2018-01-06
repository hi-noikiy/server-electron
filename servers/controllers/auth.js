/**
 * 该控制器为所有服务登陆认证等业务 
 */
const proxy = require('./../proxy');
const User = proxy.User;
const cryptoHelper = require('./../ulits/cryptoHelper');

// 请求登陆
exports.login = async (ctx)=>{
    const data = ctx.request.body;
    let {username,password} = data;
    console.log('login')
    password = cryptoHelper.SHA1(password);
    let _user = await User.findOne({username:username});
    if(_user && password === _user.password){
        ctx.cookies.set('yes', 1,{ maxAge :10000 })
        ctx.response.type='application/json';
        ctx.response.body={
            success:true
        };

    }else{
        ctx.response.type='application/json';
        ctx.response.body={
            success:false
        }
    }
}


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