const token = require('./../servers/utils/token');

var _token = token.newToken('aa');
console.log(_token)
const t = token.tokenVerify(_token);
console.log(t)