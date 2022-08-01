const epress = require("express")
const app = express();


app.get("/test", (req, res) => {
    res.send("test")
})

app.listen("666", () => {
    console.log("服务器开启成功");
})
