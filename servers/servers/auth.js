const Token = require('./../utils/token');
const redisKeys = require('./../configs/redisKeys');
class UserAuth{
    constructor(user) {
        this.user = user;
        this.nowTime = Date.now();
        this.token = Token.newToken(JSON.stringify(this.user), String(this.nowTime));
    }
    // 保存状态
    saveStatus() {
        var onlieStatus = redisKeys.onlieStatus();
        var key = redisKeys.webToken();
        return Promise.all([
            app.redisClient.hset(onlieStatus, this.user.user_id, { status: 1 }),
            app.redisClient.hset(key, this.token, { signature: this.nowTime, expTime: this.nowTime })
        ])
    }
};
module.exports = UserAuth;