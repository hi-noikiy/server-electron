/**
 * 每个业务模块的中间件处理
 */
const check_code = require('./check_code'); 
const wxToken = require('./wxToken');
const wxReqXmlToJson = require('./xmlPaser');

exports.checkToken = check_code.checkToken // 验证token 
exports.wxToken = wxToken.wx_signature // 验证微信token 
exports.wxReqXmlToJson = wxReqXmlToJson // 微信请求 xml 转 json 