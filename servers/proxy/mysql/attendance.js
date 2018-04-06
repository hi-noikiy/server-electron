const attendanceModel = require('./../../models/mysql').attendanceModel;
const Sequelize = require('sequelize');
exports.addAttendance = async function (data) {
  let attendance = attendanceModel.build(data);
  return await attendance.save()
}