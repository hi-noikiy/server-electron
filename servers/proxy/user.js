const models = require('./../models');
const User = models.User;

exports.save =async (users)=>{
    const user = new User(users);
    return user.save();
}
exports.findOne =async (where)=>{
    return User.findOne(where);
}