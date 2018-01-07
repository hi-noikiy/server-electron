// 获取用户的基本信息
exports.getUserInfo = function (openId) {
    process.ACCESS_TOKEN = "s_zpdj_sx6FucwXZwUJM3YlYAGWAi1rT5g9X7Ay5WMWugV7HYIKLp44rM-fpBqjplwuUI-nNxOu2mJAXS9mfcL21w34YAIqo4N9a0xBX63n3-r6VweZ6mqUjFvtc9-7cOKQdACADZF";
    var url = wcApi.getUserInfo + process.ACCESS_TOKEN + '&openid=' + openId + '&lang=zh_CN';
    axios.get(url).then(function (data) {
        var update = {
            $set: data.data
        };
        User.addOrUpdate(data.data, function (body) { });
    });
}