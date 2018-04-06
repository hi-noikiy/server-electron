const proxy = require('./../../proxy/mysql');
const cryptoHelper = require('./../../utils/cryptoHelper');
const orderProxy = proxy.order;
/**
 * @api {post} /api/v1.0/E002-90/addorder 创建订单
 * @apiVersion 1.0.0
 * @apiName addorder
 * @apiGroup order
 * 
 * @apiParam {String} access_token 验证token.
 * @apiParam {Object} data 数据对象.
 * @apiParam {String} data.amount 金额.
 * @apiParam {String} data.note 备注
 * @apiParam {String} data.calss 课时
 * @apiParam {String} data.time_type 时长
 * @apiParam {String} data.pay_type 支付方式
 * @apiParam {String} data.teacherUuid 教师id
 * @apiParam {String} data.subjectUuid 课程id
 * @apiParam {String} data.roomUuid 教室id
 * @apiDescription 创建订单
 * @apiParamExample {json} Request-Example:
      {
        "access_token":"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNDEyODNmOGVhODdjNGVmMmE5YzQ2MTQ5YWEwNWIyNjIiLCJ1c2VybmFtZSI6InpjX2MiLCJpcCI6bnVsbCwicGhvbmUiOiIxMTEwNTQ3MzExMTIiLCJhdXRoIjoxMDAsInR5cGUiOjEsImFnZW5jaWVzVXVpZCI6IjA2ZGQ3OTIxYjczMDQ4YmM5ODJhZGZlZDI4ZTE1Mjk4Iiwibmlja25hbWUiOiJ6X2MycSIsImFnZW5jaWVzIjp7ImFnZW5jaWVzTmFtZSI6IueIseWtpuS5oOWfueiureacuuaehCJ9fQ.1E3pNjlCmFhpPbHRxeTms2A9JLQkXXOg72OQLL3H_zA",
        "data":{
          "amount":2000,
          "note":"正常上课",
          "calss":10,
          "time_type":45,
          "pay_type":1,
          "studentUuid":"772d0a9c0bdd40cd845de60d64cca61f",
          "teacherUuid":"3ede946603b44b78ae535fd887ec3c4a",
          "subjectUuid":"2787604e779942bb986b8d2359f4feb0"
        }
      }
 * @apiSuccess {Boolen} success 成功标识.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
      {
          "data": {
              "status": true,
              "is_deleted": 0,
              "id": 8,
              "amount": 2000,
              "note": "正常上课",
              "calss": 10,
              "time_type": 45,
              "pay_type": 1,
              "studentUuid": "772d0a9c0bdd40cd845de60d64cca61f",
              "teacherUuid": "3ede946603b44b78ae535fd887ec3c4a",
              "subjectUuid": "2787604e779942bb986b8d2359f4feb0",
              "orderid": "20184692fa2f2038f611e8ae2ad9d4a1320c79",
              "created_number": "41283f8ea87c4ef2a9c46149aa05b262",
              "agenciesUuid": "06dd7921b73048bc982adfed28e15298",
              "updatedAt": "2018-04-05T17:27:11.383Z",
              "createdAt": "2018-04-05T17:27:11.383Z"
          },
          "success": true
      }
 * @apiErrorExample {json} Error-Response:
 HTTP/1.1 200 Not Found
    {
        "success": false
    }
 */
exports.addorder = async (ctx) => {
  let data = ctx.request.body.data;
  let result = { success: true }
  let date = new Date().toLocaleDateString().replace(/-/g, '');
  data.orderid = date + cryptoHelper.UUID();
  data.created_number = ctx.request.api_user.user_id;
  data.agenciesUuid = ctx.request.api_user.agenciesUuid;
  try {
    result = await orderProxy.addOrder(data);
  } catch (e) {
    result.success = false;
    result.msg = e;
  }
  ctx.response.body = result
}
