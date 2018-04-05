const proxy = require('./../../proxy/mysql');
const cryptoHelper = require('./../../utils/cryptoHelper');
const roomProxy = proxy.room;
/**
 * @api {post} /api/v1.0/E002-90/addroom 增加教室
 * @apiVersion 1.0.0
 * @apiName addroom
 * @apiGroup room
 * 
 * @apiParam {String} access_token 验证token.
 * @apiParam {Object} data 数据对象.
 * @apiParam {String} data.name 名称.
 * @apiParam {String} data.desc 备注.
 * @apiParam {String} data.location 地址..
 * @apiDescription 增加教室
 * @apiParamExample {json} Request-Example:
        {
            "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNDRkOTIzZWM5NjU0NDQ3Nzg2ZDA1NzA5MDg1ZDJhMDYiLCJ1c2VybmFtZSI6InpjIiwiaXAiOm51bGwsInBob25lIjoiMTEwNTQ3MzExMTIiLCJhdXRoIjoxMDAsInR5cGUiOjEsImFnZW5jaWVzVXVpZCI6bnVsbCwibmlja25hbWUiOiJ6X2MyIiwiYWdlbmNpZXMiOm51bGx9.q54BoLdg5pmZWwVMKu2EcnTF1ZWwwSipU3bT0PWe7WA",
            "data":{
                "name":"hello培训机构",
                "phone":"13423805474",
                "address":"广东深圳",
                "desc":"测试机构添加",
                "email":"467201392@qq.com"
            }
        }
 * @apiSuccess {Boolen} success 成功标识.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *     }
 * @apiErrorExample {json} Error-Response:
 HTTP/1.1 200 Not Found
{
    "success": false
}
 */
exports.addRoom = async (ctx) => {
  let data = ctx.request.body.data;
  let result = { success: true }
  data.uuid = cryptoHelper.UUID();
  data.created_number = ctx.request.api_user.user_id;
  data.agenciesuuid = ctx.request.api_user.agenciesUuid;
  try {
    result.data = await roomProxy.addRoom(data);
  } catch (e) {
    result.success = false;
    result.msg = e.errors;
  }
  ctx.response.body = result
}
