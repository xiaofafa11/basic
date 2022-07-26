//1.导入express
const express = require("express");
//2.创建web服务器
const app = express();
//把public中的文件对外开放访问了
//app.use(express.static("public"));
app.use("/public", express.static("public"));
//3.监听get请求
app.get("/index", (req, res, next) => {
    next();
    //处理函数
    res.writeHeader("200", {
        "content-type": "text/html;charset=utf-8"
    })
    res.end("首页")
})
app.get("/login", (req, res) => {
    //处理函数
    //req.query
    //username=zq pwd=123
    console.log(req.query.username);
    res.writeHeader("200", {
        "content-type": "text/html;charset=utf-8"
    })
    res.end("列表页")
})
app.get("/list/:id", (req, res) => {
    res.writeHeader("200", {
        "content-type": "text/html;charset=utf-8"
    })
    if (req.params.id == "index.html") {
        res.end("首页")
    } else if (req.params.id == "login.html") {
        res.end("登录页")
    } else {
        console.log(req.params);
        res.end(req.params.html)
    }

})
//4.调用listen
app.listen(666, () => {
    console.log("服务器启动成功")
})