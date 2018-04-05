/**
 * 模型关联类
 */
const sequelize = require('./../../utils/sequelizeHelper');
// 人员表
const adminModel = require("./adminModel"); // 管理员表
const studentModel = require("./studentModel"); // 学生表
const teacherModel = require("./teacherModel"); // 教师表


// 配置表
const agenciesModel = require("./agenciesModel"); // 机构表
const subjectModel = require("./subjectModel"); // 课程表
const roomModel = require("./roomModel"); // 教室表

// 管理表
const attendanceModel = require("./attendanceModel"); // 考勤表
const orderModel = require("./orderModel"); // 订单表
const scheduleModel = require("./scheduleModel"); // 排课表

// 关联
adminModel.belongsTo(agenciesModel, { as: 'agencies' });  
// agenciesModel.belongsTo(adminModel, { as: 'admin' });  

teacherModel.belongsTo(agenciesModel, { as: 'agencies' });  
teacherModel.belongsTo(subjectModel, { as: 'subject' }); 

studentModel.belongsTo(teacherModel, { as: 'teacher' }); 
studentModel.belongsTo(agenciesModel, { as: 'agencies' }); 
studentModel.belongsTo(subjectModel, { as: 'subject' }); 

attendanceModel.belongsTo(agenciesModel, { as: 'agencies' }); 
attendanceModel.belongsTo(studentModel, { as: 'student' }); 
attendanceModel.belongsTo(teacherModel, { as: 'teacher' }); 
attendanceModel.belongsTo(subjectModel, { as: 'subject' }); 
attendanceModel.belongsTo(roomModel, { as: 'room' }); 

orderModel.belongsTo(agenciesModel, { as: 'agencies' });
orderModel.belongsTo(studentModel, { as: 'student' });
orderModel.belongsTo(teacherModel, { as: 'teacher' });
orderModel.belongsTo(subjectModel, { as: 'subject' });

scheduleModel.belongsTo(agenciesModel, { as: 'agencies' });
scheduleModel.belongsTo(studentModel, { as: 'student' });
scheduleModel.belongsTo(teacherModel, { as: 'teacher' });
scheduleModel.belongsTo(subjectModel, { as: 'subject' });
scheduleModel.belongsTo(roomModel, { as: 'room' });

// 创建表
// sequelize.sync({ force: false });