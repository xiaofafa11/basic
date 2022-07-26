const express = require("express");
const app = express();

//调用路由模块
const apiRouter = require("./router/apiRouter.js");
//注册路由
app.use(apiRouter);





app.listen(666, () => {
    console.log("服务器开启成功");
})