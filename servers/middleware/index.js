/**
 * 每个业务模块的中间件处理
 */
const check_code = require('./check_code'); 
const wxVerify = require('./wxVerify');
const wxReqXmlToJson = require('./xmlPaser');

exports.checkToken = check_code.checkToken // 验证token 
exports.wx_verify = wxVerify.wx_signature // 验证微信token 
exports.wxReqXmlToJson = wxReqXmlToJson // 验证微信token 