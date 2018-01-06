var axios = require('axios');
var fs = require('fs');
var path = require('path');
var cryptoHelper = require('./../ulits/cryptoHelper');

var config = require('./../../configs/config');

const _cfg = Object.assign(config.wxCfg,config.wxapi);

exports.wx_signature = async (ctx, next)=>{
    console.log('微信验证')
    var token = _cfg.token;
    var signature = ctx.query.signature;
    var timestamp = ctx.query.timestamp;
    var nonce = ctx.query.nonce;
    var echostr = ctx.query.echostr;
    var str = [token, timestamp, nonce].sort().join('');
    var sha = cryptoHelper.SHA1(str);
    if (sha === signature) {
        if (echostr) process.ECHOSTR = echostr;
        new GetToken(_cfg);
    }
    await next();
}


function GetToken(opt) {
    var _this = this;
    this.appid = opt.appid;
    this.appsecret = opt.appsecret;
    var reqUrl = opt.getToken + this.appid + '&secret=' + this.appsecret;
    var accessToken = null;
    var now = new Date().getTime();
    return this.readAccessToken().then(function(data) {
        accessToken = data;
        if (accessToken.expires_in > now) {
            process.ACCESS_TOKEN = accessToken.access_token;
        } else {
            _this.reGetAccessToken(reqUrl);
        }
    }).catch(function(err) {
        if (!err) {
            _this.reGetAccessToken(reqUrl);
        }
    });

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

GetToken.prototype.readAccessToken = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.resolve(__dirname + '/../token'), function(err, data) {
            if (err || !new Buffer(data).toString()) reject(false);
            else resolve(JSON.parse(data))
        })
    })
}

GetToken.prototype.writeAccessToken = function(data) {
    fs.writeFileSync(path.resolve(__dirname + '/../token'), data, { encoding: 'UTF-8' });
}