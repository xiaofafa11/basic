const express = require("express")
const app = express();


app.get("/test", (req, res) => {
    //允许哪些客户端可以访问
    res.header("Access-Control-Allow-Origin", "*")
    //允许客户端可以使用哪些请求
    res.header("Access-Control-Allow-Methods", "GET,POST")
    const data = { name: "zs", age: 18 }
    res.send(data)
})

app.listen("3000", () => {
    console.log("服务器开启成功");
})
