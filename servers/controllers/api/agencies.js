const proxy = require('./../../proxy/mysql');
const cryptoHelper = require('./../../utils/cryptoHelper');
const agencies = proxy.agencies;
/**
 * 该控制器为系统后台业务逻辑 
 */
/**
 * @api {post} /api/v1.0/E002-90/addagencies 增加机构
 * @apiVersion 1.0.0
 * @apiName addagencies
 * @apiGroup agencies
 * 
 * @apiParam {String} access_token 验证token.
 * @apiParam {Object} data 机构数据对象.
 * @apiParam {String} data.name 名称.
 * @apiParam {String} data.phone 手机号码.
 * @apiParam {String} data.address 地址.
 * @apiParam {String} data.desc 备注.
 * @apiParam {String} data.email 邮箱..
 * @apiDescription 增加机构
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
 * @apiSuccess {String} access_token  token验证.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhNGUzYWYzNTU1NTZmNmVhYzk3ZWQ3ZiIsInVzZXJuYW1lIjoiemhlbmdjaG9uZyIsIm5pY2tuYW1lIjoi6YOR5bSHIn0.EgCt35m9gUjDfOT0Az0gzXx9MBHJnOfYcxTDuDJRbpk"
 *     }
 * @apiError UserNotFound The <code>password</code> of the password was error.
 * @apiErrorExample {json} Error-Response:
 HTTP/1.1 200 Not Found
 {
    "success": true,
    "data": {
        "auth": 10,
        "is_deleted": 0,
        "name": "hello1培训机构",
        "phone": "13423805475",
        "address": "广东深圳",
        "desc": "测试机构添加",
        "email": "467201322@qq.com",
        "uuid": "d8a407853c534a59bab3d8e3f5c29cb5",
        "updatedAt": "2018-04-05T07:58:32.686Z",
        "createdAt": "2018-04-05T07:58:32.686Z",
        "id": 10
    }
}
 */
exports.addagencies = async (ctx) => {
  let data = ctx.request.body.data;
  let result = { success: true }
  data.uuid = cryptoHelper.UUID();
  try {
    result.data = await agencies.addagencies(data);
  } catch (e) {
    result.success = false;
    result.msg = e.errors;
  }
  ctx.response.body = result
}
