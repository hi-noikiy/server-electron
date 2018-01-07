"use strict";
const Router = require('koa-router');
const index = require('./../controllers/api')
const middleware = require('./../middleware');
const router = new Router();

// 加入token验证
router.use('/',middleware.checkToken);
router.use('/',middleware.checkAuth);

router.post('/type', middleware.isToken, middleware.isAuth, index.api);
router.post('/untoken', middleware.isAuth, index.api);
router.post('/unauth', middleware.isToken, index.api);

module.exports = router;