// 导入 express 模块
const express = require('express')
const bodyParser = require("body-parser");
// 创建 express 的服务器实例
const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use((req,res,next)=>{
  //允许那些客户端可以访问
  res.header("Access-Control-Allow-Origin","*");
  //允许客户端使用那些请求方法
  res.header("Access-Control-Allow-Methods","get,post,head");
  //允许客户端请求的同时携带cookie信息
  res.header("Access-Control-Allow-Credentials",true);
  next();
});
//请配置 Session 中间件
const session = require('express-session')
app.use(
  session({
    secret: 'itheima',
    resave: true,
    saveUninitialized: false,
    cookie:{
      maxAge:24*60*60*1000        //有效时间一天
    }
  })
)
app.use((req,res,next)=>{
  //允许那些客户端可以访问
  res.header("Access-Control-Allow-Origin","*");
  //允许客户端使用那些请求方法
  res.header("Access-Control-Allow-Methods","get,post,head");
  //允许客户端请求的同时携带cookie信息
  res.header("Access-Control-Allow-Credentials",true);
  next();
});

// 托管静态页面
app.use(express.static('./pages'))
// 解析 POST 提交过来的表单数据
app.use(express.urlencoded({ extended: false }))

// 登录的 API 接口
app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== 'admin') {
    return res.send({ status: 1, msg: '登录失败' })
  }

  // 请将登录成功后的用户信息，保存到 Session 中
  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
  console.log(req.session)
  req.session.user = req.body // 用户的信息
  console.log(req.session)
  req.session.islogin = true // 用户的登录状态
  res.send({ status: 0, msg: '登录成功' })
})

// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // 请从 Session 中获取用户的名称，响应给客户端
  console.log(req.session)
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: 'fail' })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username
  })
})

// 退出登录的接口
app.post('/api/logout', (req, res) => {
  //清空 Session 信息
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录成功'
  })
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(666, function () {
  console.log('Express server running at http://127.0.0.1:666')
})
