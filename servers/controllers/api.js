/**
 * 该控制器为系统后台业务逻辑 
 */
exports.api = async (ctx)=>{
    console.log('222----')
    console.log(ctx.params)
    const router = ctx.params.router;
    console.log(router)
    ctx.response.body = {
        success:true
    }
}