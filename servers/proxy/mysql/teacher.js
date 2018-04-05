const teacherModel = require('./../../models/mysql').teacherModel;
const Sequelize = require('sequelize');
exports.addteacher = async function (data) {
  let teacher = teacherModel.build(data);
  return await teacher.save()
}