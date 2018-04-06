const qiniu = require('qiniu');
const config = require('./../configs');
let ACCESS_KEY = config.qiniu.AccessKey;
let SECRET_KEY = config.qiniu.SecretKey;
var mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);

let bucket = 'chong';
// let key = 'redisHelper.js';
var options = {
  scope: bucket,
  expires: 7200,
  returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
};



// 获取上传token
function getToken(options) {
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
  return uploadToken
}



var configs = new qiniu.conf.Config();
// 空间对应的机房
configs.zone = qiniu.zone.Zone_z2;
var formUploader = new qiniu.form_up.FormUploader(configs);
var putExtra = new qiniu.form_up.PutExtra();
var key = 'testsss.txt';
formUploader.put(getToken(options), key, "hello world", putExtra, function (respErr,
  respBody, respInfo) {
  if (respErr) {
    throw respErr;
  }
  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
})

var localFile = "./servers/utils/redisHelper.js";
var formUploader = new qiniu.form_up.FormUploader(configs);
var putExtra = new qiniu.form_up.PutExtra();
var _key = 'redisHelper.js';
// 文件上传
formUploader.putFile(getToken(options), _key, localFile, putExtra, function (respErr,
  respBody, respInfo) {
  if (respErr) {
    throw respErr;
  }
  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});


