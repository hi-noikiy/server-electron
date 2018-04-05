const studentModel = require('./../../models/mysql').studentModel;
const Sequelize = require('sequelize');
exports.addstudent = async function (data) {
  let student = studentModel.build(data);
  return await student.save()
}