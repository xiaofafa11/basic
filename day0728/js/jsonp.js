function jsonp(options) {
    //动态创建script标签
    var script = document.createElement("script");
    //拼接字符串变量
    var params = "";
    for (const attr in options.data) {
        params += "&" + attr + "=" + options.data[attr]
    }
    var fnName = "myjsonp" + Math.random().toString().replace(".", "")
    //把fnName函数变为全局函数
    window[fnName] = options.success;
    //script标签添加src属性
    script.src = options.url + "?callback=" + fnName + params;
    //把script标签放到页面中
    document.body.appendChild(script);
    //给script标签添加onload事件
    script.onload = function () {
        document.body.removeChild(script);
    }
}