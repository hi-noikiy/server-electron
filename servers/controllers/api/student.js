const proxy = require('./../../proxy/mysql');
const cryptoHelper = require('./../../utils/cryptoHelper');
const studentProxy = proxy.student;
/**
 * 该控制器为系统后台业务逻辑 
 */
/**
 * @api {post} /api/v1.0/E002-90/addstudent 增加学生
 * @apiVersion 1.0.0
 * @apiName addstudent
 * @apiGroup student
 * 
 * @apiParam {String} access_token 验证token.
 * @apiParam {Object} data 数据对象.
 * @apiParam {String} data.name 学生名字.
 * @apiParam {String} data.phone 电话.
 * @apiParam {String} data.address 联系地址.
 * @apiParam {String} data.desc 描述
 * @apiParam {String} data.parent_name 家长姓名
 * @apiParam {String} data.parent_phone 家长电话
 * @apiParam {String} data.level 水平描述
 * @apiParam {String} data.note 备注
 * @apiParam {String} data.birth 出生年月日
 * @apiParam {String} data.class_status 排课状态
 * @apiParam {String} data.join_time 入职日期
 * @apiParam {String} data.sex 性别 1男 0 女
 * @apiParam {String} data.sale_id 顾问id
 * @apiParam {String} data.status 学生状态 10报名 20 缴费  30 正在上课 40 续费 50 结业
 * @apiParam {String} data.teacherUuid 教师id
 * @apiParam {String} data.subjectUuid 课程id
 * @apiParam {String} data.amount 余额
 * @apiDescription 增加学生
 * @apiParamExample {json} Request-Example:
    {
      "access_token":"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNDEyODNmOGVhODdjNGVmMmE5YzQ2MTQ5YWEwNWIyNjIiLCJ1c2VybmFtZSI6InpjX2MiLCJpcCI6bnVsbCwicGhvbmUiOiIxMTEwNTQ3MzExMTIiLCJhdXRoIjoxMDAsInR5cGUiOjEsImFnZW5jaWVzVXVpZCI6IjA2ZGQ3OTIxYjczMDQ4YmM5ODJhZGZlZDI4ZTE1Mjk4Iiwibmlja25hbWUiOiJ6X2MycSIsImFnZW5jaWVzIjp7ImFnZW5jaWVzTmFtZSI6IueIseWtpuS5oOWfueiureacuuaehCJ9fQ.1E3pNjlCmFhpPbHRxeTms2A9JLQkXXOg72OQLL3H_zA",
      "data":{
        "name":"冯小乖1",
        "phone":"150127765081",
        "address":"广东深圳",
        "desc":"冯老师1",
        "birth":"2002-10-20",
        "parent_name":"冯小文1",
        "parent_phone":"2017-10-20",
        "level":"入门1",
        "note":"备注",
        "class_status":10,
        "teacherUuid":"3ede946603b44b78ae535fd887ec3c4a",
        "subjectUuid":"2787604e779942bb986b8d2359f4feb0"
      }

    }
 * @apiSuccess {Boolen} success 成功标识.
 * @apiSuccess {String} access_token  token验证.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
    {
        "success": true,
        "data": {
            "sex": 1,
            "status": 10,
            "is_deleted": 0,
            "id": 2,
            "name": "冯小乖1",
            "phone": "150127765081",
            "address": "广东深圳",
            "birth": "2002-10-20T00:00:00.000Z",
            "parent_name": "冯小文1",
            "parent_phone": "2017-10-20",
            "level": "入门1",
            "note": "备注",
            "class_status": 10,
            "teacherUuid": "3ede946603b44b78ae535fd887ec3c4a",
            "subjectUuid": "2787604e779942bb986b8d2359f4feb0",
            "uuid": "772d0a9c0bdd40cd845de60d64cca61f",
            "created_number": "41283f8ea87c4ef2a9c46149aa05b262",
            "agenciesUuid": "06dd7921b73048bc982adfed28e15298",
            "updatedAt": "2018-04-05T15:43:59.921Z",
            "createdAt": "2018-04-05T15:43:59.921Z"
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
exports.addstudent = async (ctx) => {
  let data = ctx.request.body.data;
  let result = { success: true }
  data.uuid = cryptoHelper.UUID();
  data.created_number = ctx.request.api_user.user_id;
  data.agenciesUuid = ctx.request.api_user.agenciesUuid;
  try {
    result.data = await studentProxy.addstudent(data);
  } catch (e) {
    result.success = false;
    result.msg = e;
  }

  ctx.response.body = result
}
