/**
 * 该控制器为系统后台业务逻辑 
 */
exports.api = async (ctx)=>{
    const router = ctx.params.router;
    console.log(ctx.params)
    ctx.response.body = {
        success:true
    }
}

exports.untoken = async (ctx) => {
    const router = ctx.params.router;
    console.log(ctx.params)
    ctx.response.body = {
        success: true
    }
}

exports.unauth = async (ctx) => {
    const router = ctx.params.router;
    console.log(ctx.params)
    ctx.response.body = {
        success: true
    }
}