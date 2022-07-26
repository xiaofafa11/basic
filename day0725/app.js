//导入express模块
const express = require("express");
const querystring = require("querystring");
//导入jwt相关的包
const jwt = require("jsonwebtoken");
// const {expressjwt:exjwt} = require("express-jwt");

//定义密钥
const seretKey = "keyboard cat";

//导入mysql模块
const mysql = require("mysql");
//建立与MySQL数据库的连接
const db = mysql.createPool({
    host: "127.0.0.1", //数据库的IP地址
    user: "root", //登录数据库的账户
    password: "123456", //登录数据库的密码
    database: "school", //指定要操作哪个数据库
});

//创建web服务器
const app = express();
//导入session中间件
const session = require("express-session");
//配置session中间件
app.use(
    session({
        secret: "news1.1.3",
        resave: false,
        saveUninitialized: true,
    })
);

// app.use(
//     exjwt({ secret: seretKey, algorithms: ["HS256"] ,credentialsRequired:true}).unless({
//             path: ["/login","/logout"]
//     })
// );
//配置局部中间件
const mw1 = (req, res, next) => {
    var str = "";
    req.on("data", (value) => {
        str += value;
    });
    req.on("end", () => {
        req.body = querystring.parse(str);
        next();
    });
};

app.post("/login", mw1, (req, res) => {
    var sql = "select * from student where stuName = ? and pwd = ?";
    db.query(sql, [req.body.userName, req.body.pwd], (err, results) => {
        //异常处理
        if (err) return console.log(err.message);
        //查询成功的结果
        //登录成功
        if (results != null && results.length > 0) {
            req.session.user = req.body;
            console.log(req.session.user);
            // req.session.isLogin = true;
            var token = jwt.sign({ userName: req.session.user.userName }, seretKey, {
                expiresIn: "600s",
            });
            req.session.token = token;
            res.send({
                status: 200,
                message: "登录成功",
                token,
            });
        } else {
            res.send({ status: 1, msg: "登录失败" });
        }
    });
});

app.get("/getUserName", (req, res) => {
    // if(!req.session.isLogin){
    //     return res.send({status:1,msg:"未登录"})
    // }
    // res.send({status:0,msg:"登录成功",userName:req.session.user.userName})
    var token = req.session.token;
    console.log(token);
    jwt.verify(token, seretKey, (err, data) => {
        console.log(data);
        res.send({
            status: 200,
            message: "获取用户信息成功",
            data,
        });
    });
    //          res.send({
    //              status:200,
    //              message:"获取用户信息成功"
    //          });
});
//退出的接口
app.get("/logout", (req, res) => {
    //清空当前客户端对应的session信息
    req.session.destroy();
    res.send({ status: 0, msg: "退出登录成功" });
});

//利用错误中间件捕获异常
// app.use((err,req,res,next)=>{
//     //token解析失败导致的错误
//     if(err.name === "UnauthorizedError"){
//         return res.send({status:401,message:"无效的token"})
//     }
//     //其它原因导致的错误
//     next(err);
// });

app.listen("666", () => {
    console.log("服务器开启成功");
});
