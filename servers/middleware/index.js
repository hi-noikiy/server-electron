/**
 * 每个业务模块的中间件处理
 */
const check_code = require('./check_code'); 
const wxToken = require('./wxToken');
const wxReqXmlToJson = require('./xmlPaser');

exports.checkToken = check_code.checkToken // 验证token 
exports.wxToken = wxToken.wx_signature // 验证微信token 
exports.wxReqXmlToJson = wxReqXmlToJson // 微信请求 xml 转 json 
exports.checkAuth = check_code.checkAuth // 验证权限
exports.isToken = check_code.isToken // 需要token 验证 
exports.isAuth = check_code.isAuth // 需要权限验证 
exports.getTokenUser = check_code.getTokenUser // 需要权限验证 