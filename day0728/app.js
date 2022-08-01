const express = require("express")
const session = require("express-session")
const cors = require("cors");
const formidable = require("formidable");
//创建web服务器
const app = express();
//导入body-parser中间件
const parser = require("body-parser");
//使用app.use()注册中间件
app.use(parser.urlencoded({ extended: false }));
//注册跨域

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

// app.get("/test", (req, res) => {
//     res.send("test")
// })
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*")
//     //允许客户端可以使用哪些请求
//     res.header("Access-Control-Allow-Methods", "GET,POST")
//     // const data = { name: "zs", age: 18 }
//     //res.send(data)
//     next();
// })
app.post("/login", (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        //console.log(fields.userName);
        var sql = "select * from admin where adminName= ?and pwd = ?"
        db.query(sql, [fields.userName, fields.pwd], (err, result) => {
            //console.log(result);
            if (err) return console.log(err.message);
            if (result != null && result.length > 0) {
                updateStatus(1, result[0]);

                req.session.admin = result[0];
                console.log(req.session.admin);

            } else {
                console.log("该用户不存在");
            }
        })
    })
})

function updateStatus(status, admin) {
    var sql = "update admin set status = ? where adminName = ?";
    db.query(sql, [admin, admin.adminName], (err, result) => {
        status = admin.status;
        console.log(status);
        if (result.affectedRows === 1) {
            console.log(result);

            console.log("修改状态成功")
        } else {
            console.log(111);
        }
    })
}

app.post("/register", (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        var sql = "insert into admin values(?,?,?,?,?)";
        let obj = [fields.userName, fields.pwd, fields.email, fields.job = 0, fields.status = 1]
        db.query(sql, obj, (err, result) => {
            if (err) console.log(err.message);
            if (result.affectedRows === 1) {
                console.log("注册成功");
            } else {
                console.log("用户名已存在");
            }
        })
    })

})
app.listen("3001", () => {
    console.log("服务器开启成功");
})
