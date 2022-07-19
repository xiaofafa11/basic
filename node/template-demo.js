const template = require("art-template");
const http = require("http");
const path = require("path");
const server = http.createServer();
server.on("request", (req, res) => {
    const views = path.join(__dirname, "art", "index.art")
    const html = template(views, {
        data: {
            name: "zs",
            age: 18,
            address: "地球"
        }
    })
    res.end(html)
})

server.listen("80", () => {
    console.log("服务器开启");
})
