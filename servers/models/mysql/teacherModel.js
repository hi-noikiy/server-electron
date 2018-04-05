const Sequelize = require('sequelize');

const teacherModel = app.sequelizeHelper.define('softTeacher', {
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
    type: Sequelize.STRING, allowNull: false
  },
  address: {
    type: Sequelize.STRING, allowNull: false
  },
  desc: {
    type: Sequelize.STRING, allowNull: false
  },
  birth: {
    type: Sequelize.DATE
  },
  cardid: {
    type: Sequelize.STRING
  },
  join_time: {
    type: Sequelize.DATE
  },
  email: {
    type: Sequelize.STRING
  },
  auth: {
    type: Sequelize.TINYINT, allowNull: false,defaultValue:30
  },
  categories: {
    type: Sequelize.STRING
  },
  job_status: {
    type: Sequelize.INTEGER,defaultValue:10,allowNull:false 
  },
  is_deleted: {
    type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 // 0为未删除 1为已删除
  }
}, {
    comment: '教师表'
  })
module.exports = teacherModel;
