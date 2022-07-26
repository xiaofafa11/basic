//导入express
const express = require("express");
//创建路由对象
const router = express.Router();
//创建路由级别中间件
router.use((req, res, next) => {
    console.log("这里是路由级别中间件");
    next();
})
//挂载路由
router.get("/user/list", (req, res) => {

    res.send("get 用户列表")
})

router.get("/user/add", (req, res) => {
    throw new Error("服务器内部发生错误！");
    res.send("get 用户添加")
})
router.use((err, req, res, next) => {    //错误级别的中间件
    console.log("发生的错误:" + err.message);
    res.send("Error" + err.message)
})
//向外导出路由对象
module.exports = router;