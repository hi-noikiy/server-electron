const subjectModel = require('./../../models/mysql').subjectModel;
// const agenciesModel = require('./../../models/mysql').agenciesModel;
const Sequelize = require('sequelize');
exports.addsubject = async function (data) {
  let subject = subjectModel.build(data);
  return await subject.save()
}