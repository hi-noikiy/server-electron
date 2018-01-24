
const models = require('./../models');
const User = models.User;
const mysql = require('./../utils/mysqlHelper');
const sqlToXml = require('./../utils/xmlTool').sqlToXml;

exports.save =async (users)=>{
    const user = new User(users);
    return user.save();
}
exports.findOne =async (where)=>{
    return User.findOne(where);
}

// 注册用户
exports.sqlAddUser = async (users) => {
    var xml = sqlToXml({data:users})
    return new Promise(function (resolve, reject) {
        mysql.query(`CALL sp_function(${xml});`, function (err, docs) {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}