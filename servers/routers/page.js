"use strict";

const router = require('koa-router')();
const page = require('./../controllers/page')

router.get('/',page.index)

module.exports = router;