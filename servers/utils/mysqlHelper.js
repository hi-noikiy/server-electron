const mysql = require('mysql');
const configs = require('../configs/config').mysql;
const connection = mysql.createConnection(configs)

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    
    console.log('connected as id ' + connection.threadId);
});
module.exports = connection;