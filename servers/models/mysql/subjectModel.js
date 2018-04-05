const Sequelize = require('sequelize');

const subjectModel = app.sequelizeHelper.define('softSubject', {
  uuid: {
    type: Sequelize.UUID, allowNull: false, unique: true, primaryKey: true
  },
  id: {
    type: Sequelize.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true
  },
  name: {
    type: Sequelize.STRING, allowNull: false, unique: true
  },
  type: {
    type: Sequelize.STRING //授课方式 一对一 | 一对多
  },
  categories:{ // 分类
    type: Sequelize.UUID
  }, 
  class_time: { // 时长 单位 min
    type: Sequelize.INTEGER
  },
  class_type: { // 模式 入门|普通 |进阶 |提高
    type: Sequelize.STRING
  },
  agencieuuid: { 
    type: Sequelize.UUID, allowNull: false,
  },
  created_number: { // 创建者
    type: Sequelize.UUID, allowNull: false,
  },
  is_deleted: {
    type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 // 0为未删除 1为已删除
  }
}, {
    comment: '课程表'
  })
module.exports = subjectModel;
