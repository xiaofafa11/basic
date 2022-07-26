const express = require("express");
const app = express();
const qs = require("querystring")


app.use((req, res, next) => {
    var str = "";
    req.on("data", (value) => {
        str += value;
    })
    req.on("end", (value) => {
        req.body = qs.parse(str);
        next();
    })
})
app.post("/login", (req, res) => {
    res.send(req.body)
})
app.listen(666, () => {
    console.log("服务器启动成功");
})