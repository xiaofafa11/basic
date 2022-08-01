const express = require("express");

const bodyParser = require("body-parser")
const app = express();
const cors = require("cors");
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.get("/getInfo", (req, res) => {
    console.log(req.query.id);
    res.send("你好")
})
app.post("/login", (req, res) => {
    console.log(req.body);
})
app.get("/demo1", (req, res) => {
    console.log(req.query);
    res.send(req.query)
})
app.get("/demo2", (req, res) => {
    console.log(req.query);
    res.send(req.query)
})
app.get("/demo6", (req, res) => {
    res.status(500).send("请求错误")
    //res.send("请求错误")
})
app.listen(666, () => {
    console.log("服务器开启成功");
})