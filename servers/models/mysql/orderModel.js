const Sequelize = require('sequelize');

const orderModel = app.sequelizeHelper.define('softOrder', {
  id: {
    type: Sequelize.INTEGER, allowNull: false, unique: true, autoIncrement: true,primaryKey: true
  },
  orderid: {
    type: Sequelize.UUID, allowNull: false, unique: true , primaryKey: true
  },
  value: {
    type: Sequelize.INTEGER ,allowNull: false, defaultValue:0
  },
  calss: {
    type: Sequelize.INTEGER, allowNull: false, defaultValue: 0
  },
  time_type: {
    type: Sequelize.INTEGER, allowNull: false, defaultValue: 0
  },
  pay_type: {
    type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 //(1.微信 2.支付宝 3.现金 4.刷卡 5.其他 )
  },
  note: {
    type: Sequelize.STRING, allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
  },
  start_time: {
    type: Sequelize.DATE
  },
  is_deleted: {
    type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 // 0为未删除 1为已删除
  }
}, {
    comment: '订单表'
  })
module.exports = orderModel;
