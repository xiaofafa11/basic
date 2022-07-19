//导入模块
const http = require("http");
//导入querystring模块
const queryString = require("querystring")
//创建web服务器
const web = http.createServer();

web.on("request", (req, res) => {
    let postData = "";
    //监听参数传递事件
    req.on("data", (val) => {
        postData += val;
    })
    //监听参数完毕事件
    req.on("end", () => {
        let obj = queryString.parse(postData)
        console.log(obj);
    })
})

web.listen(88, () => {
    console.log("当前的端口号是88");
});