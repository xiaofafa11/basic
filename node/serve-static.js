const http = require("http");
const serve_static = require("serve-static");
const serve = serve_static("public");
const server = http.createServer();
server.on("request", (req, res) => {
    serve(req, res, () => { })
})
server.listen(80)