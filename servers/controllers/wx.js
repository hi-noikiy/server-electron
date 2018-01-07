/**
 * 该控制器为微信业务逻辑 
 */
const wxResTemp = require('./../utils/wxResTemp');
const wxUtils = require('./wx/wxUtils');
// 验证微信配置
exports.index = async(ctx)=>{
    ctx.response.body = ctx.query.echostr;
}

// 接收微信消息
exports.wxReceiveMsg = async (ctx)=>{
    const msgObj = ctx.body.xml;
    var msgtype = msgObj.MsgType.toLocaleLowerCase();
    var reMsg = null;
    switch (msgtype) {
        case 'text':
            reMsg =await wxUtils.receiveText(msgObj);  
            break;
        case 'video':
            reMsg = await wxUtils.receiveVideo(msgObj);     
            break;    
        case 'location':
            reMsg = await wxUtils.receivelocation(msgObj);    
            break;  
        case 'link':
            reMsg = await wxUtils.receiveLink(msgObj);    
            break;  
        case 'event':
            reMsg = await wxUtils.receiveEvent(msgObj);    
            break; 
        case 'image':
            reMsg = await wxUtils.receiveImg(msgObj);
            break;
    }
    ctx.type = 'text/xml';
    ctx.body = reMsg;  
}




