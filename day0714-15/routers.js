const getRouter = require("router");

const router = getRouter();
const http = require("http");
const server = http.createServer();
server.on("request", (req, res) => {
    res.writeHeader("200", {
        "content-type": "text/html;charset=utf-8"
    })
    router(req, res, () => { })
})
router.get("/", () => {
    res.end("首页")
})
router.get("/index", () => {
    res.end("首页")
})
router.get("/login", () => {
    res.end("登录页")
})
router.post("/", () => {
    res.end("添加")
})
server.listen("80", () => {
    console.log("服务器启动成功");
})