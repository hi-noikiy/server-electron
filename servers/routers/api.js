"use strict";
const Router = require('koa-router');
const index = require('./../controllers/api')
const middleware = require('./../middleware');
const router = new Router();
// 加入token验证
router.use('/',middleware.checkToken);

router.post('/:router/:type?', index.api);

module.exports = router;