const studentModel = require('./../../models/mysql').studentModel;
const Sequelize = require('sequelize');
exports.addstudent = async function (data) {
  let student = studentModel.build(data);
  return await student.save()
}


exports.findOne = async function (data) {
  return await studentModel.findAll(data)
}


exports.update = async function (data,query) {
  return await studentModel.update(data, query)
}