const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:String,
    password:String,
    nickname:String,
    mobilePhone:String
});

module.exports = mongoose.model('User', UserSchema);