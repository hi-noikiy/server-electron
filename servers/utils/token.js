const jwt = require('jsonwebtoken');

// 生成token工具
exports.newToken = function (data, signature) {
    if (typeof data !== 'string') {
        return null;
    }
    return jwt.sign(data, signature);
}

// 检测token
exports.tokenVerify = async function (token, signature) {
    if (!token || typeof token !== 'string') return false;
    const decoded = jwt.verify(token, signature);
    return decoded;
}