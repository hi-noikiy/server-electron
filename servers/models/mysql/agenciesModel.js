const Sequelize = require('sequelize');

const AgenciesModel = app.sequelizeHelper.define('softAgencies', {
  uuid: {
    type: Sequelize.UUID, allowNull: false, unique: true, primaryKey: true
  },
  id: {
    type: Sequelize.INTEGER, allowNull: false, unique: true, autoIncrement: true
  },
  name: {
    type: Sequelize.STRING, allowNull: false, unique: true
  },
  phone: {
    type: Sequelize.INTEGER, allowNull: false
  },
  address: {
    type: Sequelize.STRING, allowNull: false
  },
  desc: {
    type: Sequelize.STRING, allowNull: false
  },
  email: {
    type: Sequelize.STRING, unique: true
  },
  auth: {
    type: Sequelize.TINYINT, allowNull: false,defaultValue:10
  },
  agencies: {
    type: Sequelize.STRING
  },
  expiration: {
    type: Sequelize.DATE
  },
  created_number: {
    type: Sequelize.UUID
  },
  is_deleted: {
    type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 // 0为未删除 1为已删除
  }
}, {
    comment: '机构表'
  })
module.exports = AgenciesModel;
