var config={
    v:'v1.0',// 版本号
    server:{
        port:3001
    },
    redis:{
        host:'//192.168.1.102:',
        port:6379
    },
    mongodb:{
        port:27017,
        server:'mongodb://127.0.0.1:',
        name: 'z_chongDev'
    },
    mysql: {
        host: '127.0.0.1',
        port: 3306,
        user: 'z_chong',
        password: 'z_chong123',
        database:'z_chongDev'
    },
    router:{
        unverifyToken: 'E001', // 免验证token路由
        unverifyAuth:'000' // 免验证权限路由
    },
    // 微信 认证登陆获取签名配置
    wxCfg:{
        appid: 'wxf444e12fda0da9e3',
        appsecret: 'f9d2532894fbdb223017a0b9b54702b3',
        token: 'abcdefg',
        checkSignature: true
    },
    // 微信公众号接口api
    wxapi:{
        getToken:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=',
        getUserInfo: 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=',
        tagApi:{
            createTag:'https://api.weixin.qq.com/cgi-bin/tags/create?access_token=',
            getTags:'https://api.weixin.qq.com/cgi-bin/tags/get?access_token=',
            updateTag:'https://api.weixin.qq.com/cgi-bin/tags/update?access_token=',
            removeTag:'https://api.weixin.qq.com/cgi-bin/tags/delete?access_token=',
            getTagUserNum:'https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token=',
            setMembersTag:'https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token=',
            unsetMembersTag:'https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?access_token=',
            getMemberTagLists:'https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token=',
        }
    },
    InvalidTime: {
        apitoken:3600*1000*4 //api token过期时长
    },
    qiniu: {
        AccessKey: "Fr7deZZYAMO_rtYdTHX7w8F6G7yTx-cqRWNsOSvb",
        SecretKey: "hsP53EldHkctZ-6u_qFziySkat3B_LGmP8FY5uD9",
    }
}


module.exports =config;