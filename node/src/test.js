const fs = require("fs");
fs.readFile("../test.txt", "utf-8", (err, doc) => {
    let content = doc + "我的名字叫张三";
    fs.writeFile("../test.txt", content, err => {
        console.log("写入成功");
    })
})

