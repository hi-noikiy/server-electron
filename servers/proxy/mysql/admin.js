const adminModel = require('./../../models/mysql').adminModel;
const agenciesModel = require('./../../models/mysql').agenciesModel;
const Sequelize = require('sequelize');
exports.addUser = async function (data) {
  var result = {
    success:true
  }
  let admin = adminModel.build(data);
  await admin.save().then(result => {
      
  }).catch(error => {
    result.success=false
    })
  return result;
}

exports.findOne = async function (data) {
  let result = null;
  await adminModel.findAll({
    where: {
      username: data.username,
      pwd:data.pwd
    },
    include: [
      {
        model: agenciesModel,
        as: 'agencies',
        attributes: [['name', 'agenciesName']]
      }
    ],
    attributes: ['user_id', 'username', 'ip', 'phone', 'auth', 'type', 'agenciesUuid', 'nickname']
  }).then(docs => {
    if (docs.length > 0) {
      result = docs[0].dataValues 
    }
    }).catch(e => {
      console.log(e)
  })
  
  return result;
}