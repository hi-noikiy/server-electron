const router = require('../../configs/config').router; 
//   检验token 是否有效
exports.checkToken = async (ctx,next)=>{
    const access_token = ctx.request.body.access_token;
    const _router = ctx.params;
    console.log('token')
    if(_router.router != router.unverify){
        if(access_token=='1111'){
           await next();
        }else{
            ctx.status = 404;
            ctx.response.body = {
                success:false,
                message:'void token'
            }
        }
    }else{
        await next();
    }
}