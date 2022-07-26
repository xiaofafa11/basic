const express = require("express");

const qs = require("querystring");

const apiRouter = express.Router();

var nw1 = ((req, res, next) => {
    var str = "";
    req.on("data", (value) => {
        str += value;
    })
    req.on("end", () => {
        req.body = qs.parse(str);
        next();
    })
})
//编写get接口
apiRouter.get("/list", (req, res) => {
    //获取客户端通过查询字符串发送到服务器的数据
    const query = req.query;
    res.send({
        status: 0,
        msg: "get请求成功",
        data: query
    })
})

apiRouter.post("/post", nw1, (req, res) => {
    //获取客户端通过请求体，发送到服务器端URL-encoded数据
    const body = req.body;
    res.send({
        status: 0,
        msg: "post请求成功",
        data: body
    })
})


module.exports = apiRouter;