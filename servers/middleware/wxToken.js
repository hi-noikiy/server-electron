var axios = require('axios');
var fs = require('fs');
var path = require('path');
var cryptoHelper = require('./../utils/cryptoHelper');

var config = require('./../../configs/config');

const _cfg = Object.assign(config.wxCfg,config.wxapi);

//  微信签名认证
exports.wx_signature = async (ctx, next)=>{
    var token = _cfg.token;
    var signature = ctx.query.signature;
    var timestamp = ctx.query.timestamp;
    var nonce = ctx.query.nonce;
    var echostr = ctx.query.echostr;
    var str = [token, timestamp, nonce].sort().join('');
    var sha = cryptoHelper.SHA1(str);
    if (sha === signature) {
        new GetToken(_cfg);
        await next();
    }
}

// 获取并坚持微信token
function GetToken(opt) {
    var _this = this;
    this.appid = opt.appid;
    this.appsecret = opt.appsecret;
    var reqUrl = opt.getToken + this.appid + '&secret=' + this.appsecret;
    var now = new Date().getTime();

    const data = this.readAccessToken();
    data.then(_data => {
        if (typeof _data == 'string') {
            try {
                const _token = JSON.parse(_data);
                if (_token.expires_in < now) {
                    _this.reGetAccessToken(reqUrl);
                } 
            } catch (e) {
                console.error('token parse is error')
            }
        }
    })
}

GetToken.prototype.reGetAccessToken = function (reqUrl) {
    var _this = this;
    this.getAccessToken(reqUrl).then(function(data) {
        var now = new Date().getTime();
        data.expires_in = now + data.expires_in * 1000 - 200;
        process.ACCESS_TOKEN = data.access_token;
        _this.writeAccessToken(JSON.stringify(data));
    });
}

GetToken.prototype.getAccessToken = function(url) {
    return new Promise(function(resolve, reject) {
        axios.get(url).then(function(data) {
            resolve(data.data)
        })
    })
}

GetToken.prototype.readAccessToken = async function() {
        var key = app.okeys.wxToken();
        return await app.redisClient.hgetVal(key, 'token');
}

GetToken.prototype.writeAccessToken = async function (data) {
    var key = app.okeys.wxToken();
    await app.redisClient.hset(key, 'token', data);
}