const Sequelize = require('sequelize');
const AdminModel = app.sequelizeHelper.define('softAdmin', {
  user_id: {
    type: Sequelize.UUID, allowNull: false, unique: true, primaryKey: true
  },
  // id: {
  //   type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
  // },
  username: {
    type: Sequelize.STRING, allowNull: false, unique: true
  },
  nickname: {
    type:Sequelize.STRING
  },
  pwd: {
    type:Sequelize.STRING
  },
  ip: {
    type: Sequelize.STRING 
  },
  phone: {
    type: Sequelize.STRING, allowNull: false, unique: true
  },
  email: {
    type: Sequelize.STRING, unique: true
  },
  auth: {
    type: Sequelize.TINYINT, allowNull: false, defaultValue: 40
  },
  type: {
    type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 // 0 为客户端管理员 1 为web管理员 2位超级管理员
  },
  is_deleted: {
    type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 // 0为未删除 1为已删除
  }
}, {
  comment:'记录管理员表'  
})
module.exports = AdminModel;
