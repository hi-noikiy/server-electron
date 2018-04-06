"use strict";
const Router = require('koa-router');
const api = require('./../controllers/api')
const middleware = require('./../middleware');
const router = new Router();

// 加入token验证
router.use('/',middleware.checkToken);
router.use('/',middleware.checkAuth);
// 增删改查
router.post('/addagencies', middleware.isToken, api.agencies.addagencies);
router.post('/addroom', middleware.isToken, api.room.addRoom);
router.post('/addsubject', middleware.isToken, api.subject.addsubject);
router.post('/addteacher', middleware.isToken, api.teacher.addteacher);
router.post('/addstudent', middleware.isToken, api.student.addstudent);
router.post('/addattendance', middleware.isToken, api.attendance.addAttendance);
router.post('/addorder', middleware.isToken, api.order.addorder);


// 取缓存数据
/**
 * 其中包括 学生\教师\教室\课程\ 
 */
router.post('/getCacheData', middleware.isToken, api.cache.getCacheData);


module.exports = router;