const Sequelize = require('sequelize');

const scheduleModel = app.sequelizeHelper.define('softShedule', {
  id: {
    type: Sequelize.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true
  },
  scheduleid: {
    type: Sequelize.UUID, allowNull: false, unique: true, primaryKey: true
  },
  date: {
    type: Sequelize.DATEONLY
  },
  time: {
    type: Sequelize.DATE
  },
  weekly: {
    type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 // 1-7
  },
  time_length: {
    type: Sequelize.INTEGER, allowNull: false, defaultValue: 0
  },
  day_type: {
    type: Sequelize.STRING, allowNull: false, defaultValue: 0 //(1.微信 2.支付宝 3.现金 4.刷卡 5.其他 )
  },
  status: {
    type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 // 0 未上 1 以上
  },
  start_time: {
    type: Sequelize.DATE
  },
  end_time: {
    type: Sequelize.DATE
  },
  is_deleted: {
    type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 // 0为未删除 1为已删除
  }
}, {
    comment: '排课表'
  })
module.exports = scheduleModel;
