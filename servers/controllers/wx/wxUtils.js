
const configs = require('./../../configs');
const redisKeys = require('./../../configs/redisKeys');
const wxResTemp = require('./../../utils/wxResTemp');

// 获取用户的基本信息
exports.getUserInfo = async function (openId) {
    const key = redisKeys.wx_token();
    const token = await app.redisClient.hgetVal(key)
    var url = configs.wcApi.getUserInfo + token + '&openid=' + openId + '&lang=zh_CN';
    axios.get(url).then(function (data) {
        var update = {
            $set: data.data
        };
        // User.addOrUpdate(data.data, function (body) { });
    });
}

// 接收文字消息
exports.receiveText = async (msgObj) =>{
    var toUser = msgObj.FromUserName,
        fromUser = msgObj.ToUserName,
        type = msgObj.MsgType,
        text = '收到你的消息';
    var info = {};
    info = { toUsername: toUser, fromUsername: fromUser, type: 'text', text: text, createTime: new Date().getTime(), msgType: type, content: text };
    return wxResTemp(info);
}
// 接收音频消息
exports.receiveVideo = async (msgObj) => {
    var toUser = msgObj.FromUserName,
        fromUser = msgObj.ToUserName,
        type = msgObj.MsgType,
        text = '收到你的消息';
    var info = {};
    info = { toUsername: toUser, fromUsername: fromUser, type: 'text', text: text, createTime: new Date().getTime(), msgType: type, content: text };
    return wxResTemp(info);
}

// 接收定位消息
exports.receivelocation = async (msgObj) =>{
    var toUser = msgObj.FromUserName,
        fromUser = msgObj.ToUserName,
        type = msgObj.MsgType,
        text = '收到你的消息';
    var info = {};
    info = { toUsername: toUser, fromUsername: fromUser, type: 'text', text: text, createTime: new Date().getTime(), msgType: type, content: text };
    return wxResTemp(info);
}

// 接受链接
exports.receiveLink = async (msgObj) => {
    var toUser = msgObj.FromUserName,
        fromUser = msgObj.ToUserName,
        type = msgObj.MsgType,
        text = '收到你的消息';
    var info = {};
    info = { toUsername: toUser, fromUsername: fromUser, type: 'text', text: text, createTime: new Date().getTime(), msgType: type, content: text };
    return wxResTemp(info);
}

// 接收点击事件消息
exports.receiveEvent = async (msgObj) => {
    console.log(msgObj)
    var toUser = msgObj.FromUserName,
        fromUser = msgObj.ToUserName,
        type = msgObj.MsgType,
        text = '收到你的消息';
    var info = {};
    info = { toUsername: toUser, fromUsername: fromUser, type: 'text', text: text, createTime: new Date().getTime(), msgType: type, content: text };
    return wxResTemp(info);
}

// 接收图片消息
exports.receiveImg = async (msgObj) => {
    console.log(msgObj)
    var toUser = msgObj.FromUserName,
        fromUser = msgObj.ToUserName,
        type = msgObj.MsgType,
        text = '收到你的消息';
    var info = {};
    info = { toUsername: toUser, fromUsername: fromUser, type: 'text', text: text, createTime: new Date().getTime(), msgType: type, content: text };
    return wxResTemp(info);
}

// 创建菜单
exports.createMenu = async (menuJson)=> {
    console.log('创建菜单')
    const key = redisKeys.wx_token();
    const token = await app.redisClient.hgetVal(key)
    var url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token;
    var data = menuJson;
    axios.post(url, data).then(function (res) {
        console.log(res.data)
        console.log('aa')
    })
};


