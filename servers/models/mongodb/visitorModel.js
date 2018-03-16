var mongoose = require('mongoose');



var VisitorSchema = new mongoose.Schema({
    subscribe: Number,
    openid: String,
    nickname: String,
    visitor_type: { 
        default: 0,
        type:Number
    },
    sex: {
        type: Number,
        default: 0
    },
    language: {
        type: String,
        default: 'zh_CN'
    },
    city: String,
    province: String,
    country: String,
    headimgurl: String,
    subscribe_time: Number,
    remark: String,
    groupif: Number,
    tagid_list: Array,
    update_time: {
        type: Date,
        default: Date.parse(new Date())
    }
}, { collection: 'Visitor' });


mongoose.model('Visitor', VisitorSchema);