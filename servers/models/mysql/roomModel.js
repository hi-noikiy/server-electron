const Sequelize = require('sequelize')
const roomModel = app.sequelizeHelper.define('softRoom', {
  uuid: {
    type: Sequelize.UUID, allowNull: false, unique: true, primaryKey: true
  },
  id: {
    type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, unique: true, primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  desc: {
    type: Sequelize.STRING
  },
  agenciesuuid: {
    type: Sequelize.UUID, allowNull: false
  },
  created_number: { // 创建者
    type: Sequelize.UUID
  },
  is_deleted: {
    type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 // 0为未删除 1为已删除
  }
}, {
    comment: '教室表'
  })
module.exports = roomModel;
