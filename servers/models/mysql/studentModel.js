const Sequelize = require('sequelize');

const studentModel = app.sequelizeHelper.define('softStudent', {
  uuid: {
    type: Sequelize.UUID, allowNull: false, unique: true, primaryKey: true
  },
  id: {
    type: Sequelize.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true
  },
  name: {
    type: Sequelize.STRING, allowNull: false, unique: true
  },
  phone: {
    type: Sequelize.STRING, 
  },
  parent_name: {
    type: Sequelize.STRING
  },
  parent_phone: {
    type: Sequelize.STRING 
  },
  address: {
    type: Sequelize.STRING
  },
  birth: {
    type: Sequelize.DATE
  },
  sex: {
    type: Sequelize.INTEGER, allowNull: false,defaultValue:1
  },
  level: {
    type: Sequelize.STRING
  },
  class_status: { // 排课状态
    type: Sequelize.INTEGER, defaultValue: 10, allowNull: false
  },
  note: {
    type: Sequelize.STRING
  },
  sale_id: { // 销售
    type: Sequelize.UUID
  },
  status: {  // 学生状态
    type: Sequelize.INTEGER,defaultValue:10,allowNull:false
  },
  created_number: { // 创建者
    type: Sequelize.UUID, allowNull: false,
  },
  amount: { // 余额
    type: Sequelize.FLOAT , allowNull: false, defaultValue: 0
  },
  is_deleted: {
    type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 // 0为未删除 1为已删除
  }
}, {
    comment: '学生表'
  })
module.exports = studentModel;
