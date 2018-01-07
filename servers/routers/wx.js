"use strict";
const router = require('koa-router')();
const wx = require('./../controllers/wx')
const middleware = require('./../middleware');
// 加入token验证
router.use('/', middleware.wxToken);
router.get('/',wx.index)
// 接受微信小心
router.post('/',middleware.wxReqXmlToJson,wx.wxReceiveMsg)

module.exports = router;