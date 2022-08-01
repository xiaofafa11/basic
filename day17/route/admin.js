//导入express
const express = require("express");
const db = require("../model/connection")
//创建路由对象
const router = express.Router();
const session = require("express-session")
//创建路由级别中间件
//const path = require("path")
// const bodyParser = require("body-parser")
// router.use(bodyParser.urlencoded({ extended: false }))
//router.use(express.static(path.join(__dirname, 'public')))
//把public中的文件对外开放访问了
router.use("/public", express.static("public"));
const querystring = require("querystring");
//导入jwt相关的包
const jwt = require("jsonwebtoken");
// const {expressjwt:exjwt} = require("express-jwt");
//配置session中间件
router.use(
    session({
        secret: "news1.1.3",
        resave: false,
        saveUninitialized: true,
    })
);
//定义密钥
const seretKey = "keyboard cat";

var nw1 = (req, res, next) => {
    var str = "";
    req.on("data", (value) => {
        str += value;
    })
    req.on("end", () => {
        req.body = querystring.parse(str);
        next();
    })
}
//挂载路由
router.post("/login", nw1, (req, res) => {
    console.log(111);
    //console.log(fields);
    var sql = "select * from admin where adminName= ?and pwd = ?"
    db.query(sql, [req.body.userName, req.body.pwd], (err, results) => {
        //异常处理
        if (err) return console.log(err.message);
        //查询成功的结果
        //console.log(111);
        console.log(results[0]);
        if (results.length > 0) {
            updateStatus(0, results[0]);
            results[0].status = 0;
            req.session.admin = results[0] // 用户的信息
            //console.log(req.session)
            //req.session.islogin = true // 用户的登录状态
            res.send({ status: 0, msg: '登录成功', admin: results[0] })
        } else {
            res.send({ status: 1, msg: "登录失败", admin: [] });
        }
    });
})

function updateStatus(status, admin) {
    var sql = "update admin set status = ? where adminName = ?";
    db.query(sql, [status, admin.adminName], (err, result) => {
        if (result.affectedRows === 1) {
            console.log("修改成功");
        }
    });
}

router.get("/getinfo", (req, res) => {
    console.log(111);
    if (req.session.admin.status != 0) {
        return res.send({ status: 1, msg: '用户未登录' })
    }
    var sql = "select * from admin";
    db.query(sql, (err, results) => {
        if (err) console.log(err.message);
        res.send({
            status: 0,
            msg: "success",
            username: req.session.admin.adminName,
            adminList: results
        })
    })
})

//添加用户
router.post("/add", nw1, (req, res) => {
    // console.log(111);
    // console.log(req.body);
    var bool = false;
    var sql = "select * from admin where adminName = ?";
    db.query(sql, req.body.adminName, (err, result) => {
        if (err) console.log(err.message);
        if (result.length == 0) {
            bool = true
        }
        if (!bool) {
            res.send({
                status: 1,
                msg: "用户名已存在"
            })
        } else {
            var sql = "insert into admin values(?,?,?,?,?)";
            var obj = [req.body.adminName, req.body.pwd, req.body.email, req.body.job, req.body.status,]
            db.query(sql, obj, (err, result) => {
                if (err) console.log(err.message);
                if (result.affectedRows > 0) {
                    console.log(333);
                    res.send({

                        status: 0,
                        msg: "用户添加成功"
                    })
                } else {
                    console.log(444);
                    res.send({
                        status: 1,
                        msg: "用户已存在"
                    })
                }
            })
        }
    })
})

router.get("/delete", (req, res) => {
    var sql = "delete from admin where adminName = ?";
    db.query(sql, req.query.adminName, (err, result) => {
        if (err) console.log(err.message);
        console.log(result.affectedRows);
        if (result.affectedRows > 0) {
            console.log(333);
            res.send({
                status: 0,
                msg: "用户删除成功"
            })
        } else {
            console.log(444);
            res.send({
                status: 1,
                msg: "用户已被删除"
            })
        }
    })
})
//注销用户
router.get("/logout", (req, res) => {
    var sql = "select * from admin where adminName = ?";
    db.query(sql, req.query.adminName, (err, results) => {
        if (err) console.log(err.message);
        var result = results[0]
        console.log(results[0]);
        if (result.status == 0) {
            console.log(555);
            updateStatus(1, result);
            res.send({
                status: 0,
                msg: "用户注销成功"
            })
        } else {
            console.log(666);
            res.send({
                status: 1,
                msg: "用户未登录"
            })
        }
    })


})
router.use((err, req, res, next) => {    //错误级别的中间件
    console.log("发生的错误:" + err.message);
    res.send("Error" + err.message)
})
//向外导出路由对象
module.exports = router;