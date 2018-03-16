const models = require('./../models/mongodb');
const User = models.User;
const mysql = require('./../utils/mysqlHelper');
const sqlToXml = require('./../utils/xmlTool').sqlToXml;



//调用mongodb
exports.save =async (users)=>{
    const user = new User(users);
    return user.save();
}
//调用mongodb
exports.findOne =async (where)=>{
    return User.findOne(where);
}

// 注册用户 调用mysql存储过程
exports.sqlAddUser = async (users) => {
    var xml = sqlToXml({ data:users })
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

exports.sp_check = async (where) => {
    var xml = sqlToXml({ data: where, action: 20});
    return new Promise((resolve, reject) => {
        mysql.query(`CALL sp_getOne(${xml},@a, @b,@c)`, function (err, docs, fileds) {
            
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        })  
    })
}

exports.sqlfindOne = async (where) => {
    var sql = `select * from user where username="${where.username}"`;
    return new Promise((resolve, reject) => {
        mysql.query(sql, function (err, docs, fileds) {
            if (err) {
                reject(err)
            } else {
                resolve(docs[0])
            }
        })
    })
}