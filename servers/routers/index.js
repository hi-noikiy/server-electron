const Router = require('koa-router');
const router = new Router();
// 引入模块
const auth = require('./auth');
const api = require('./api');
const page = require('./page');
const wx = require('./wx');
const configs = require('./../configs/config')
// 加入版本号前缀
_version([api, auth], '/'+configs.v+'/:router');

// 转发路由
// web page 路由
router.use('/', page.routes(), page.allowedMethods());

// 后台系统api 接口
router.use('/api', api.routes(), api.allowedMethods());

// 前台 后台登陆认证接口
router.use('/auth', auth.routes(), auth.allowedMethods());

// 微信公众号接口
router.use('/wx', wx.routes(), wx.allowedMethods());

module.exports = router;


// 加入版本号前缀
function _version(routers,url){
    if(!Array.isArray(routers)){
        console.error('the routers must be array');
        return false; 
    }
    const _url = url || '/';
    routers.forEach(function(el){
        if( el instanceof Router ){
            el.prefix(_url)
        }
    })
}