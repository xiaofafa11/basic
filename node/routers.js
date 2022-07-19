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
router.get("/", (req, res) => {
    res.end("首页")
})
router.get("/index", (req, res) => {
    res.end("首页")
})
router.get("/login", (req, res) => {
    res.end("登录页")
})
router.post("/add", (req, res) => {
    res.end("添加")
})
server.listen("81", (req, res) => {
    console.log("服务器启动成功");
})