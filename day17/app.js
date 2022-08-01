const express = require("express")
const session = require("express-session")
const cors = require("cors");
const formidable = require("formidable");
//创建web服务器

//注册跨域
const app = express();
app.use(cors());
//配置session中间件
app.use(
    session({
        secret: "news1.1.3",
        resave: false,
        saveUninitialized: true,
    })
);
// app.use(bodyParser.urlencoded({extended:false}))
//导入mysql模块
const mysql = require("mysql");
//建立与MySQL数据库的连接
const db = mysql.createPool({
    host: "127.0.0.1",           //数据库的IP地址
    user: "root",                //登录数据库的账户
    password: "123456",           //登录数据库的密码
    database: "school"           //指定要操作哪个数据库
});


app.post("/login", (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        //console.log(fields);
        var sql = "select * from admin where adminName= ?and pwd = ?"
        db.query(sql, [fields.userName, fields.pwd], (err, result) => {
            //console.log(result);
            if (result != null && result.length > 0) {
                updateStatus(0, result[0]);
                req.session.admin = result[0];

            } else {
                console.log("该用户不存在");
            }
        })
    })
})

function updateStatus(status, admin) {
    //var sql = "select * from admin where adminName= ?and pwd = ?";
    var sql = "update  admin set status = 0 where adminName= ?and pwd = ?";
    db.query(sql, [admin.adminName, admin.pwd], (err, result) => {
        //console.log(result);
        if (result.affectedRows === 1) {
            console.log(admin);
            //status = 0;
            console.log("修改状态成功")
        }
    })
}
app.listen("3000", () => {
    console.log("服务器开启成功");
})
