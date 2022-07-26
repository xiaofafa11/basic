const express = require("express");
const app = express();
const qs = require("querystring");
//导入mysql模块
const mysql = require("mysql");
var nw1 = (req, res, next) => {
    var str = "";
    req.on("data", (value) => {
        str += value;
    })
    req.on("end", () => {
        req.body = qs.parse(str);
        next();
    })
}
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "school"
})
//查询数据
app.get("/index", nw1, (req, res) => {
    var s = "SELECT s.stuNO,s.stuName,b.subjectName,r.stuResult,r.Examtime FROM result r " +
        " INNER JOIN student s ON r.stuNo=s.stuNO" +
        " INNER JOIN SUBJECT b ON r.subjectId = b.subjectId " +
        " where s.stuName = ? and  b.subjectName = ? "
    // var sql = "SELECT s.stuNo,s.stuName,b.subjectName,r.stuResult,r.Examtime from result r" +
    //     " inner join student s on r.stuNo = s.stuNO" +
    //     " inner join subject b on r.subjectId = b.subjectId" +
    //     " where s.stuName = ?and b.subjectName = ?"
    db.query(s, ['张三', "c++程序设计"], (err, result) => {
        if (err) return console.log(err.message)
        res.send({ result })
    })
})
//添加数据
app.post("/add", nw1, (req, res) => {
    var sql = "insert into student values(?,?,?,?,?,?)";
    let obj = [req.body.stuNo, req.body.stuName, req.body.pwd, req.body.gender, req.body.address, req.body.birthday]
    db.query(sql, obj, (err, results) => {
        if (err) return console.log(err.message);
        if (results.affectedRows === 1) {
            console.log("新增数据成功");
            res.send(results)
        }
    })
})
//更新数据
app.get("/update", (req, res) => {
    var sql = "update student set  ? where stuNo = ?";
    var grade = { stuNo: 1, stuName: "张三", pwd: "123", address: "深圳" }
    db.query(sql, [grade, grade.stuNo], (err, results) => {
        if (err) return console.log(err.message);
        if (results.affectedRows >= 1) {
            console.log("修改数据成功");
            res.send(results)
        }
    })
})

//删除数据
app.get("/delete", (req, res) => {
    var sql = "delete from student where stuNo = ?";
    db.query(sql, 6, (err, results) => {
        if (err) return console.log(err.message);
        if (results.affectedRows >= 1) {
            console.log("删除数据成功");
            res.send(results)
        }
    })
})
app.listen(666, () => {
    console.log("服务器启动成功");
})