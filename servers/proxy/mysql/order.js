const orderModel = require('./../../models/mysql').orderModel;
const studentproxy = require('./student');
const Sequelize = require('sequelize');
exports.addOrder = async function (data) {
  var result = {
    data: {},
    success:true
  };
  let order = orderModel.build(data);
  let transaction;   
  try {
    // 启动事务
    transaction = await app.sequelizeHelper.transaction();
    // 开始处理事务
    result.data = await order.save({ transaction })
    let amount = await studentproxy.findOne({
      attributes: ['amount'],
      where: { uuid: data.studentUuid }
    }, { transaction });
    amount = amount[0].amount + data.amount;
    await studentproxy.update({
      amount: amount
    }, {
        where:
          { uuid: data.studentUuid }
      });
    
    // 提交 
    await transaction.commit();

  } catch (error) {
    // 出错回滚
    await transaction.rollback();
    result = {
      data: {},
      success: false
    };
  }

  return result;
}