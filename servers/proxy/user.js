const models = require('./../models');
const User = models.User;
const mysql = require('./../utils/mysqlHelper');
exports.save =async (users)=>{
    const user = new User(users);
    return user.save();
}
exports.findOne =async (where)=>{
    return User.findOne(where);
}

// 增加用户
exports.sqlAddUser = async (users) => {
    
}