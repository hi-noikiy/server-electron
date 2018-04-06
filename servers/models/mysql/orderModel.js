const Sequelize = require('sequelize');

const orderModel = app.sequelizeHelper.define('softOrder', {
  id: {
    type: Sequelize.INTEGER, allowNull: false, unique: true, autoIncrement: true,primaryKey: true
  },
  orderid: {
    type: Sequelize.UUID, allowNull: false, unique: true , primaryKey: true
  },
  amount: { // 金额
    type: Sequelize.INTEGER ,allowNull: false, defaultValue:0
  },
  calss: { // 课时
    type: Sequelize.INTEGER, allowNull: false, defaultValue: 0
  },
  time_type: { // 时长
    type: Sequelize.INTEGER, allowNull: false, defaultValue: 45
  },
  pay_type: { // 支付方式
    type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 //(1.微信 2.支付宝 3.现金 4.刷卡 5.其他 )
  },
  note: {
    type: Sequelize.STRING
  },
  status: { // 订单状态
    type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true
  },
  created_number: {
    type: Sequelize.UUID
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
