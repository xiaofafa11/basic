window.addEventListener("load", function () {
    let lis = document.querySelector("#nav").querySelectorAll(".top-nav-li"); // 获取所有导航小li
    let navline = document.getElementById("navline"); // 获取导航顶部滑块
    let bdota = document.getElementById("b_dot").querySelectorAll("a"); // 获取所有小圆点
    let publishcopyli = this.document
        .getElementById("publish-copy")
        .querySelectorAll("li"); // 获取所有banner图片
    let banner = this.document.getElementById("banner");
    // 1.给所有导航小li添加鼠标经过和离开事件
    for (var i = 0; i < lis.length; i++) {
        lis[i].addEventListener("mouseover", function () {
            navline.style.width = this.offsetWidth + "px";
            animate(navline, this.offsetLeft);
            // 导航子分类显示
            if (this.children[1]) this.children[1].style.display = "block";
        });
        lis[i].addEventListener("mouseout", function () {
            // 导航子分类隐藏
            if (this.children[1]) this.children[1].style.display = "none";
        });
    }
    // banner图片切换函数
    var num = 0;
    function fn() {
        // 先清除所有元素样式
        for (let i = 0; i < bdota.length; i++) {
            bdota[i].className = "";
            publishcopyli[i].style.display = "none";
        }
        // 再显示需要的样式
        bdota[num].className = "on";
        publishcopyli[num].style.display = "block";
        num++;
        if (num == bdota.length) num = 0;
    }
    // 2.利用定时器自动调用banner图片切换函数实现轮播图效果
    var timer = setInterval(function () {
        fn();
    }, 2000);
    // 3.鼠标经过清除定时器
    banner.onmouseover = function () {
        clearInterval(timer);
        timer = null;
    };
    // 4.鼠标离开重启定时器
    banner.onmouseout = function () {
        timer = setInterval(function () {
            fn();
        }, 2000);
    };
});
