const express = require("express");
const app = express();

//导入body-parser中间件
const parser = require("body-parser");
//使用app.use()注册中间件
app.use(parser.urlencoded({ extended: false }));

app.post("/login", (req, res) => {
    console.log(req.body.username);
    res.send("ok")
})

app.listen(666, () => {
    console.log("服务器启动成功");
})