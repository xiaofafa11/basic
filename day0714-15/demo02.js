const http = require("http");
const moment = require("moment");
const server = http.createServer();
template.defaults.root = path.join(__dirname, "views");
template.defaults.imports.moment = moment;
template.defaults.imports.extname = ".art";
server.on("request", (req, res) => {
    const html = template("index", {
        msg: "我是内容",
        time: new Date()
    })
    res.writeHeader("200", {
        "content-type": "text/html;charset=utf-8"
    })
    res.end(content)
})