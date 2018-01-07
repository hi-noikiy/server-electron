"use strict";
const router = require('koa-router')();
const wx = require('./../controllers/wx')
const middleware = require('./../middleware');
// 加入token验证
router.use('/', middleware.wxToken);

// 微信配置认证
router.get('/',wx.index)
// 接收微信消息
router.post('/',middleware.wxReqXmlToJson,wx.wxReceiveMsg)

module.exports = router;