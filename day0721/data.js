const express = require("express");
const app = express();


app.post("/login", (req, res) => {
    var content = ""
    req.on("data", () => {
        content += value
    })
    req.on("end", () => {

    })
    res.send("ok")
})

app.listen(666, () => {
    console.log("服务器启动成功");
})