const proxy = require('./../../proxy/mysql');
const cryptoHelper = require('./../../utils/cryptoHelper');
const subjectProxy = proxy.subject;
/**
 * 该控制器为系统后台业务逻辑 
 */
/**
 * @api {post} /api/v1.0/E002-90/addsubject 增加课程
 * @apiVersion 1.0.0
 * @apiName addsubject
 * @apiGroup subject
 * 
 * @apiParam {String} access_token 验证token.
 * @apiParam {Object} data 机构数据对象.
 * @apiParam {String} data.name 课程名称.
 * @apiParam {String} data.type 授课模式.
 * @apiParam {String} data.class_time 课程时长.
 * @apiParam {String} data.class_type 课程类型
 * @apiDescription 增加机构
 * @apiParamExample {json} Request-Example:
  {
    "access_token":"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNDEyODNmOGVhODdjNGVmMmE5YzQ2MTQ5YWEwNWIyNjIiLCJ1c2VybmFtZSI6InpjX2MiLCJpcCI6bnVsbCwicGhvbmUiOiIxMTEwNTQ3MzExMTIiLCJhdXRoIjoxMDAsInR5cGUiOjEsImFnZW5jaWVzVXVpZCI6IjA2ZGQ3OTIxYjczMDQ4YmM5ODJhZGZlZDI4ZTE1Mjk4Iiwibmlja25hbWUiOiJ6X2MycSIsImFnZW5jaWVzIjp7ImFnZW5jaWVzTmFtZSI6IueIseWtpuS5oOWfueiureacuuaehCJ9fQ.1E3pNjlCmFhpPbHRxeTms2A9JLQkXXOg72OQLL3H_zA",
    "data":{
      "name":"钢琴考级课程",
      "type":"一对一",
      "class_time":45,
      "class_type":"入门",
      "agencieuuid":"06dd7921b73048bc982adfed28e15298"
    }

  }
 * @apiSuccess {Boolen} success 成功标识.
 * @apiSuccess {String} access_token  token验证.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
        {
            "success": true,
            "data": {
                "is_deleted": 0,
                "name": "钢琴考级课程",
                "type": "一对一",
                "class_time": 45,
                "class_type": "入门",
                "agencieuuid": "06dd7921b73048bc982adfed28e15298",
                "uuid": "2787604e779942bb986b8d2359f4feb0",
                "created_number": "41283f8ea87c4ef2a9c46149aa05b262",
                "updatedAt": "2018-04-05T13:27:26.577Z",
                "createdAt": "2018-04-05T13:27:26.577Z",
                "id": 2
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
exports.addsubject = async (ctx) => {
  let data = ctx.request.body.data;
  let result = { success: true }
  data.uuid = cryptoHelper.UUID();
  data.created_number = ctx.request.api_user.user_id;
  data.agencieuuid = ctx.request.api_user.agenciesUuid;
  try {
    result.data = await subjectProxy.addsubject(data);
  } catch (e) {
    result.success = false;
    result.msg = e;
  }
  ctx.response.body = result
}
