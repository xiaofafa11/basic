const express = require("express");
const app = express();
//导入用户路由模块
const userRouter = require("./user.js");

//使用app.use()注册路由模块
app.use("/news", userRouter)

app.listen(666, () => {
    console.log("服务器启动成功");
})