
/**
 * 该控制器为微信业务逻辑 
 */

// 验证微信
exports.index = async(ctx)=>{
        ctx.response.body=process.ECHOSTR
}

exports.wxReceiveMsg = async (ctx)=>{
    console.log('接收微信消息')
    const val = await app.redisClient.hset('token', 'wx_token','111222');
    console.log(val)
    console.log(ctx.body.xml)
}