const mysql = require("mysql");
const db = mysql.createPool({
    host: "127.0.0.1",           //数据库的IP地址
    user: "root",                //登录数据库的账户
    password: "123456",           //登录数据库的密码
    database: "school"           //指定要操作哪个数据库
});

module.exports = db;