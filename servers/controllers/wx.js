/**
 * 该控制器为微信业务逻辑 
 */
const wxResTemp = require('./../utils/wxResTemp');
// 验证微信配置
exports.index = async(ctx)=>{
    ctx.response.body=process.ECHOSTR
}

// 接收微信消息
exports.wxReceiveMsg = async (ctx)=>{
    const msgObj = ctx.body.xml
    var msgtype = msgObj.MsgType.toLocaleLowerCase();
    switch (msgtype) {
        case 'text':
            var toUser = msgObj.FromUserName,
                fromUser = msgObj.ToUserName,
                type = msgObj.MsgType,
                text = '收到你的消息';
            var info = {};
            info = { toUsername: toUser, fromUsername: fromUser, type: 'text', text: text, createTime: new Date().getTime(), msgType: msgtype, content: text };
            var reMsg = wxResTemp(info);
            ctx.type='text/xml';
            ctx.body = reMsg;  
            break;
        case 'video':
            break;    
        case 'location':
            break;  
        case 'link':
            break;  
        case 'event':
            break; 
    }
}




