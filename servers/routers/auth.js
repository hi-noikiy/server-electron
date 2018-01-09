"use strict";
const Router = require('koa-router');
const auth = require('./../controllers/auth')
const middleware = require('./../middleware');
const router = new Router();

// 加入token验证
router.use('/',middleware.checkToken);
router.post('/login', auth.login);

router.post('/signup', auth.signup);
router.post('/offline', middleware.isToken, auth.offline);
router.post('/checkauth', auth.checkAuth);


module.exports = router;