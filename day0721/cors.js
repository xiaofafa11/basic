const express = require("express");
const app = express();

const apiRouter = require("./router/apiRouter.js");
app.use("/api", apiRouter);

//配置cors中间件
const cors = require("cors")
app.use(cors());
app.listen(666, () => {
    console.log("服务器启动成功");
})