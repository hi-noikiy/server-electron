"use strict";

const Router = require('koa-router');
const auth = require('./../controllers/auth')
const middleware = require('./../middleware');
const router = new Router();
// 加入token验证
router.use('/',middleware.checkToken);
router.post('/login/:type?', auth.login);

router.post('/signup/:type?', auth.signup);


module.exports = router;