//导入模块
const http = require("http");
const urls = require("url");
//创建web服务器
const web = http.createServer();

web.on("request", (req, res) => {
    // const url = req.url;
    // let content = "404";

    // // let headers = req.headers;
    // if (url === "/" || url == "/index.html") {
    //     content = "<h1>首页</h1>"
    // } else if (url == "/login.html") {
    //     content = "<h1>登录页</h1>"
    // }
    console.log("服务器启动成功");
    let { obj } = urls.parse(req.url, true)
    console.log(obj);
    //响应报头信息，解决编码格式
    // console.log(req.method);
    // console.log(req.url);

    //解决乱码
    //方式1
    // res.setHeader("Content-type", "text/html;charset=utf-8");
    //方式2(使用第二种方式)
    res.writeHeader("200", {
        "content-type": "text/html;charset=utf-8"
    })
    // res.end(content)
})

web.listen(80, () => {
    console.log("当前的端口号是80");
});