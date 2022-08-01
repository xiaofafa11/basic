//引入express框架
const express = require("express");
const cors = require("cors");
const path = require("path");
// const bodyParser = require("body-parser");
const formidable = require("formidable");
//创建web服务器
const app = express();
//注册跨域
app.use(cors());
// app.use(bodyParser.urlencoded({extended:false}))
//导入mysql模块
const mysql = require("mysql");
//建立与MySQL数据库的连接
const db = mysql.createPool({
    host: "127.0.0.1",           //数据库的IP地址
    user: "root",                //登录数据库的账户
    password: "admin",           //登录数据库的密码
    database: "school"           //指定要操作哪个数据库
});


app.get("/verifyEmail", (req, res) => {
    //获取客户端发送过来的邮箱
    const email = req.query.email;
    //模拟判断邮箱地址
    if (email == "zq@qq.com") {
        //提示邮箱已存在
        res.status(400).send({ message: "邮箱地址已经注册，请更换" });
    } else {
        //邮箱地址可用
        res.send({ message: "恭喜，邮箱地址可用" });
    }
});
app.get("/searchAuto", (req, res) => {
    const key = req.query.search;
    var sql = "select stuName from student where stuName like ? ";
    db.query(sql, "%" + key + "%", (err, result) => {
        //异常处理
        if (err) return console.log(err.message);
        var list = [];
        for (var item of result) {
            list.push(item.stuName);
        }
        res.send(list);
    });
});
app.get("/getProvince", (req, res) => {
    res.json([
        { id: '1', name: '江西省' },
        { id: '2', name: '四川省' },
        { id: '3', name: '河北省' },
        { id: '4', name: '江苏省' }
    ]);
});
app.get("/getCitys", (req, res) => {
    //获取省份ID
    const id = req.query.id;
    const citys = {
        '1': [{
            id: "300",
            name: "南昌市"
        }, {
            id: "301",
            name: "赣州市"
        }, {
            id: "302",
            name: "宜春市"
        }, {
            id: "303",
            name: "九江市"
        }],
        "2": [{
            id: "400",
            name: "成都市"
        }, {
            id: "401",
            name: "绵阳市"
        }, {
            id: "402",
            name: "德阳市"
        }, {
            id: "403",
            name: "攀枝花市"
        }],
        "3": [{
            id: "500",
            name: "石家庄市"
        }, {
            id: "501",
            name: "唐山市"
        }, {
            id: "502",
            name: "秦皇岛市"
        }, {
            id: "503",
            name: "邯郸市"
        }
        ],
        "4": [
            {
                id: "600",
                name: "常州市"
            }, {
                id: "601",
                name: "徐州市"
            }, {
                id: "602",
                name: "南京市"
            }, {
                id: "603",
                name: "淮安市"
            }
        ]
    }
    //响应
    res.send(citys[id]);
});
//根据城市id获取区县
app.get("/getAreas", (req, res) => {
    //获取城市id
    const id = req.query.id;
    //模拟区县信息
    const areas = {
        '300': [
            { id: "20", name: "青山湖区" },
            { id: "21", name: "东湖区" },
            { id: "22", name: "西湖区" },
            { id: "23", name: "高新区" }
        ],
        '301': [
            { id: "30", name: "章贡区1" },
            { id: "31", name: "章贡区2" },
            { id: "32", name: "章贡区3" },
            { id: "33", name: "章贡区4" }
        ],
        '302': [
            { id: "30", name: "袁州区1" },
            { id: "31", name: "袁州区2" },
            { id: "32", name: "袁州区3" },
            { id: "33", name: "袁州区4" }
        ]
    }
    //响应
    res.send(areas[id] || []);
});

app.post("/getFormDate", (req, res) => {
    //创建formidable对象解析表单对象
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        res.send(fields);
    })
});
//实现文件上传的路由
app.post("/getFormDataFile", (req, res) => {
    //创建formiudable对象解析表单对象
    const form = new formidable.IncomingForm();
    //设置客户端上传文件的存储路径
    form.uploadDir = path.join(__dirname, "uploads");
    //保存上传文件的后缀  是否保存文件后缀
    form.keepExtensions = true;
    //解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        console.log(".\\uploads" + files.attrName.filepath.split("uploads")[1]);
        //将客户端传递过来的文件地址响应到客户端
        res.send({
            path: ".\\uploads" + files.attrName.filepath.split("uploads")[1]
        });

    })
})

//监听服务器
app.listen("666", () => {
    console.log("服务器开启成功 ")
});