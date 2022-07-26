const express = require("express");


//const mysql = require("mysql");
//导入express-session中间件
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const app = express();

const secretKey = "keyboard key"

app.post("/login", (req, res) => {
    res.send({
        status: 200,
        message: "登录成功",
        token: jwt.sign({ username: req.session.user.userName },
            secretKey, { expressIn: "30s" })
    })
})
//.unless({path:[/^\/.\//]})
app.use(expressJwt({ secret: secretKey }))

app.get("/getInfo", (req, res) => {
    console.log(req.user);
    res.send({
        status: 200,
        message: "获取用户信息成功",
        data: req.user
    })
})
//express-jwt错误中间件
app.use((err, res, res, next) => {
    //token解析失败导致的错误
    if (err.name === "UnAuthorizationError") {
        return res.send({ status: 401, message: "无效的token" })
    }
    res.send({ status: 500, message: "未知错误" })
})
app.listen("666", () => {
    console.log("服务器开启成功");
})