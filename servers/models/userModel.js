const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:String,
    password:String,
    nickname: String,
    email: String,
    auth: {
        default: 0,
        type:Array
    },
    type: {
        type: Number,
        default:0
    },
    phone:String
});

module.exports = mongoose.model('User', UserSchema);