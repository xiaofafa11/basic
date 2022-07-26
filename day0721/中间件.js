const express = require("express");
const app = express();
//中间件
// const nw = (req, res, next) => {
//     console.log("这里就是一个最简单的中间件函数");
//     //表示把亏赚关系传递给下一个中间件或路由
//     next();
// }
// app.use(nw);
//简化中间件
// app.use((req, res, next) => {
//     req.a = 10;
//     console.log("这里就是第一个最简单的中间件函数");
//     //表示把亏赚关系传递给下一个中间件或路由
//     next();
// });
// app.use((req, res, next) => {
//     req.b = 20;
//     console.log("这里就是第二个最简单的中间件函数");
//     //表示把亏赚关系传递给下一个中间件或路由
//     next();
// });

const nw1 = (req, res, next) => {
    console.log("这里是局部中间件1");
    next();
}
const nw2 = (req, res, next) => {
    console.log("这里是局部中间件2");
    next();
}
app.get("/index", nw2, nw1, (req, res) => {
    console.log("index");
    res.send("这里是index")
})
app.get("/list", (req, res) => {
    console.log("list");
    res.send("这里是list")
})
// app.get("/index", (req, res) => {
//     // console.log(req.a);
//     // console.log(req.b);
//     console.log("index");
//     res.send("这里是index")
// })

app.listen(666, () => {
    console.log("服务器启动成功");
})