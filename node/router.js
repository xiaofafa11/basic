//导入http模块
const http = require("http");
const url = require("url")
//创建WEB服务器
const server = http.createServer();
server.on("request", (req, res) => {
    let { pathname } = url.parse(req.url);
    res.writeHeader("200", {
        "content-type": "text/html;charset=utf-8"
    })
    if (pathname == "/" || pathname == "/index.html") {
        res.end("首页")
    } else if (pathname == "/list") {
        res.end("列表页")
    } else {
        res.end("你访问的页面不存在")
    }
})
server.listen("80", () => {
    console.log("服务器已开启");
})