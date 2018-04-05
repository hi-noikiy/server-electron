const adminModel = require('./../../models/mysql').adminModel;
const agenciesModel = require('./../../models/mysql').agenciesModel;
const Sequelize = require('sequelize');
exports.addagencies = async function (data) {
  let agencies = agenciesModel.build(data);
  return await agencies.save()
}