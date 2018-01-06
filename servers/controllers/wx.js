
/**
 * 该控制器为微信业务逻辑 
 */

// 验证微信
exports.index = async(ctx)=>{
        ctx.response.body=process.ECHOSTR
}

exports.wxReceiveMsg = async (ctx)=>{
    console.log('接收微信消息')
    console.log(ctx.body.xml)
}