const express = require("express")
const session = require("express-session");
const path = require("path")
const cors = require("cors");
//const bodyParser = require("body-parser")
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
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    })
);
app.use(express.static(path.join(__dirname, 'public')))
//app.use(bodyParser.urlencoded({ extended: false }))
//导入mysql模块

const getRouter = require("./route/admin");
//app.use(getRouter)
//建立与MySQL数据库的连接
// const db = mysql.createPool({
//     host: "127.0.0.1",           //数据库的IP地址
//     user: "root",                //登录数据库的账户
//     password: "123456",           //登录数据库的密码
//     database: "school"           //指定要操作哪个数据库
// });


app.use("/admin", getRouter)


app.listen("3000", () => {
    console.log("服务器开启成功");
})
