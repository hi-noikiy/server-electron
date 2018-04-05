"use strict";
const Router = require('koa-router');
const api = require('./../controllers/api')
const middleware = require('./../middleware');
const router = new Router();

// 加入token验证
router.use('/',middleware.checkToken);
router.use('/',middleware.checkAuth);

router.post('/addagencies', middleware.isToken, api.agencies.addagencies);
router.post('/addroom', middleware.isToken, api.room.addRoom);
router.post('/addsubject', middleware.isToken, api.subject.addsubject);
router.post('/addteacher', middleware.isToken, api.teacher.addteacher);
router.post('/addstudent', middleware.isToken, api.student.addstudent);

module.exports = router;