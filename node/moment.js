//导入日期格式转换模块
const moment = require("moment");

console.log(moment().format("YYYY-MM-DD HH:mm:ss")); //当前时间 （24小时制）
//当前时间增加1小时
console.log(moment().add(1, "hours").format("YYYY-MM-DD HH:mm:ss"));
//当前时间增加1个月
console.log(moment().add(1, "months").format("YYYY-MM-DD HH:mm:ss"));
//当前时间的前10天时间
console.log(moment().subtract(10, "days").format("YYYY-MM-DD HH:mm:ss"));
console.log(moment().subtract(1, "years").format("YYYY-MM-DD HH:mm:ss"));    //当前时间的前1年时间
console.log(moment().subtract(3, "months").format("YYYY-MM-DD HH:mm:ss"));   //当前时间的前3个月时间
console.log(moment().subtract(1, "weeks").format("YYYY-MM-DD HH:mm:ss"));    //当前时间的前一个星期时间
//获取月的开始时间
// console.log(moment(req.body.renewStartTime).startOf('month').format("YYYY-MM-DD") + " 00:00:00");
// moment(req.body.renewStartTime).startOf('month').format("YYYY-MM-DD") + " 00:00:00";
// //获取月的结束时间
// moment(req.body.renewEndTime).endOf('month').format("YYYY-MM-DD") + " 23:59:59";
const startDate = moment().startOf('month').format("YYYY-MM-DD") + " 00:00:00";
const endDate = moment().endOf('month').format("YYYY-MM-DD") + " 23:59:59";
console.log(startDate);
console.log(endDate);