const proxy = require('./../../proxy/mysql');
const cryptoHelper = require('./../../utils/cryptoHelper');
const attendanceProxy = proxy.attendance;
/**
 * @api {post} /api/v1.0/E002-90/addattendance 增加考勤
 * @apiVersion 1.0.0
 * @apiName addattendance
 * @apiGroup attendance
 * 
 * @apiParam {String} access_token 验证token.
 * @apiParam {Object} data 数据对象.
 * @apiParam {String} data.leavetime 到达时间.
 * @apiParam {String} data.note 备注.
 * @apiParam {String} data.status 状态 0 迟到 10正常 20 早退
 * @apiParam {String} data.studentUuid 学生id
 * @apiParam {String} data.teacherUuid 教师id
 * @apiParam {String} data.subjectUuid 课程id
 * @apiParam {String} data.roomUuid 教室id
 * @apiDescription 增加考勤
 * @apiParamExample {json} Request-Example:
    {
      "access_token":"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNDEyODNmOGVhODdjNGVmMmE5YzQ2MTQ5YWEwNWIyNjIiLCJ1c2VybmFtZSI6InpjX2MiLCJpcCI6bnVsbCwicGhvbmUiOiIxMTEwNTQ3MzExMTIiLCJhdXRoIjoxMDAsInR5cGUiOjEsImFnZW5jaWVzVXVpZCI6IjA2ZGQ3OTIxYjczMDQ4YmM5ODJhZGZlZDI4ZTE1Mjk4Iiwibmlja25hbWUiOiJ6X2MycSIsImFnZW5jaWVzIjp7ImFnZW5jaWVzTmFtZSI6IueIseWtpuS5oOWfueiureacuuaehCJ9fQ.1E3pNjlCmFhpPbHRxeTms2A9JLQkXXOg72OQLL3H_zA",
      "data":{
        "attivetime":"2018-04-05 07:35:06",
        "note":"正常上课",
        "status":10,
        "studentUuid":"772d0a9c0bdd40cd845de60d64cca61f",
        "teacherUuid":"3ede946603b44b78ae535fd887ec3c4a",
        "subjectUuid":"2787604e779942bb986b8d2359f4feb0",
        "roomUuid":"774e7232f4834971b12f05a2654df8eb"
      }
    }
 * @apiSuccess {Boolen} success 成功标识.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
    {
        "success": true,
        "data": {
            "is_deleted": 0,
            "leavetime": "2018-04-04T23:35:06.000Z",
            "note": "正常上课",
            "status": 10,
            "studentUuid": "772d0a9c0bdd40cd845de60d64cca61f",
            "teacherUuid": "3ede946603b44b78ae535fd887ec3c4a",
            "subjectUuid": "2787604e779942bb986b8d2359f4feb0",
            "roomUuid": "774e7232f4834971b12f05a2654df8eb",
            "attendanceid": "6490aaea2b3b40acb9196128c1eae0a0",
            "created_number": "41283f8ea87c4ef2a9c46149aa05b262",
            "agenciesUuid": "06dd7921b73048bc982adfed28e15298",
            "updatedAt": "2018-04-05T16:13:33.263Z",
            "createdAt": "2018-04-05T16:13:33.263Z",
            "id": 2
        }
    }
 * @apiErrorExample {json} Error-Response:
 HTTP/1.1 200 Not Found
  {
      "success": false
  }
 */
exports.addAttendance  = async (ctx) => {
  let data = ctx.request.body.data;
  let result = { success: true }
  data.attendanceid = cryptoHelper.UUID();
  data.created_number = ctx.request.api_user.user_id;
  data.agenciesUuid = ctx.request.api_user.agenciesUuid;
  try {
    result.data = await attendanceProxy.addAttendance(data);
  } catch (e) {
    result.success = false;
    result.msg = e;
  }
  ctx.response.body = result
}
