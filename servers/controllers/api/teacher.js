const proxy = require('./../../proxy/mysql');
const cryptoHelper = require('./../../utils/cryptoHelper');
const teacherProxy = proxy.teacher;
/**
 * 该控制器为系统后台业务逻辑 
 */
/**
 * @api {post} /api/v1.0/E002-90/addteacher 增加老师
 * @apiVersion 1.0.0
 * @apiName addteacher
 * @apiGroup teacher
 * 
 * @apiParam {String} access_token 验证token.
 * @apiParam {Object} data 教师数据对象.
 * @apiParam {String} data.name 教师名字.
 * @apiParam {String} data.phone 电话.
 * @apiParam {String} data.address 联系地址.
 * @apiParam {String} data.desc 描述备注
 * @apiParam {String} data.birth 出生年月日
 * @apiParam {String} data.cardid 省份证号
 * @apiParam {String} data.join_time 入职日期
 * @apiParam {String} data.email 电子邮箱
 * @apiParam {String} data.job_status 在职状态
 * @apiDescription 增加老师
 * @apiParamExample {json} Request-Example:
  {
    "access_token":"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNDEyODNmOGVhODdjNGVmMmE5YzQ2MTQ5YWEwNWIyNjIiLCJ1c2VybmFtZSI6InpjX2MiLCJpcCI6bnVsbCwicGhvbmUiOiIxMTEwNTQ3MzExMTIiLCJhdXRoIjoxMDAsInR5cGUiOjEsImFnZW5jaWVzVXVpZCI6IjA2ZGQ3OTIxYjczMDQ4YmM5ODJhZGZlZDI4ZTE1Mjk4Iiwibmlja25hbWUiOiJ6X2MycSIsImFnZW5jaWVzIjp7ImFnZW5jaWVzTmFtZSI6IueIseWtpuS5oOWfueiureacuuaehCJ9fQ.1E3pNjlCmFhpPbHRxeTms2A9JLQkXXOg72OQLL3H_zA",
    "data":{
      "name":"冯小文",
      "phone":"15012776508",
      "address":"广东深圳",
      "desc":"冯老师",
      "birth":"1992-10-20",
      "cardid":"4414231991102020234",
      "join_time":"2017-10-20",
      "email":"470669925@qq.com",
      "job_status":10
    }

  }
 * @apiSuccess {Boolen} success 成功标识.
 * @apiSuccess {String} access_token  token验证.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
    {
        "success": true,
        "data": {
            "auth": 30,
            "is_deleted": 0,
            "name": "冯小文",
            "phone": "15012776508",
            "address": "广东深圳",
            "desc": "冯老师",
            "birth": "1992-10-20T00:00:00.000Z",
            "cardid": "4414231991102020234",
            "join_time": "2017-10-20T00:00:00.000Z",
            "email": "470669925@qq.com",
            "job_status": 10,
            "uuid": "3ede946603b44b78ae535fd887ec3c4a",
            "agenciesUuid": "06dd7921b73048bc982adfed28e15298",
            "updatedAt": "2018-04-05T13:43:42.451Z",
            "createdAt": "2018-04-05T13:43:42.451Z",
            "id": 1
        }
    }
 * @apiError UserNotFound The <code>password</code> of the password was error.
 * @apiErrorExample {json} Error-Response:
 HTTP/1.1 200 Not Found
  {
      "success": false,
      "msg": ''
  }
 */
exports.addteacher= async (ctx) => {
  let data = ctx.request.body.data;
  let result = { success: true }
  data.uuid = cryptoHelper.UUID();
  data.created_number = ctx.request.api_user.user_id;
  data.agenciesUuid = ctx.request.api_user.agenciesUuid;
  try {
    result.data = await teacherProxy.addteacher(data);
  } catch (e) {
    result.success = false;
    result.msg = e;
  }
  
  ctx.response.body = result
}
