/**
 * redis 缓存key值统一管理
 */

/**
 * 微信token 
 */
exports.wxToken = function(){
    return 'wx_token';
}

/**
 * api
 * token 
 */
exports.apiToken = function () {
    return 'api_token';
}

/**
 * webpage
 * token 
 */
exports.webToken = function () {
    return 'web_token';
}

/**
 * 用户登陆状态 
 */
exports.onlieStatus = function () {
    return 'user_status';
}