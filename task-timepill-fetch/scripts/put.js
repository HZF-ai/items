// console.log(name, ema, content, gettipmessage);
// alert(name);
// alert(ema);
// alert(content);
// alert(gettipmessage);
// 获取当前系统时间
// function getTimer() {
//     let time = new Date();
//     let y = time.getFullYear();
//     let mon = time.getMonth() + 1;
//     let day = time.getDate();
//     let h = time.getHours();
//     h = h < 10 ? '0' + h : h;
//     let m = time.getMinutes();
//     m = m < 10 ? '0' + m : m;
//     let s = time.getSeconds();
//     s = s < 10 ? '0' + s : s;
//     return y + '-' + mon + '-' + day + ' ' + h + '-' + m + '-' + s;
// }

// 获取距离1970年到现在总的毫秒
// let nowtime = Date.now();
// 用户输入时间与系统时间
function countDown(time) {
    let inputtime = +new Date(time);
    let times = (nowtime - inputtime) / 1000; //剩余时间毫秒数；
    // let d = parseInt(times / 60 / 60 / 24); //天
    // let h = parseInt(times / 60 / 60 % 24); //时
    // let m = parseInt(times / 60 % 60); //分
    // let s = parseInt(times % 60); //秒
    // return d + '天' + h + '时' + m + '分' + s + '秒';
    return times;

}


// console.log(countDown('2021-7-19 18:00:00'))
// alert(name.length);
// alert(ema.length);
// alert(content.length);
// alert(tipmessage.length);
//生成随机4个字母：
// function randcode() {
//     let str = "";
//     for (var i = 0; i < 4; i++) {
//         str += String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));

//     }
//     return str;
// }

function sub() {
    let name = document.getElementById("username").value;
    let ema = document.getElementById("useremail").value;
    let content = document.getElementById("usercontent").value;
    let tipmessage = document.getElementById("usertipmessage").value;
    let inputtime = document.getElementById("inputtime").value;

    let err1 = document.getElementById("err1");
    let err2 = document.getElementById("err2");
    let err3 = document.getElementById("err3");
    // alert(name);
    // alert(ema);
    // alert(console);
    // alert(tipmessage);
    // let storage = window.localStorage;
    // alert(name);
    //保存数据
    // storage.setItem("name-key", name);
    // storage.setItem("email-key", ema);
    // storage.setItem("content-key", content);
    // storage.setItem("tipmessage-key", tipmessage);
    // storage.setItem("keytime", inputtime);
    // console.log(setname, setemail, setcontent, settipmessage);
    // 获取数据
    // let name = storage.getItem("name-key");
    // let ema = storage.getItem("email-key");
    // let content = storage.getItem("content-key");
    // let gettipmessage = storage.getItem("tipmessage-key");    
    let emreg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    let a;
    // storage.setItem("keytime", inputtime);
    // alert(typeof(inputtime));
    // alert(inputtime);
    // let a = new Date();
    // alert(a.getTime());
    // let b = (new Date(inputtime)).getTime();
    // alert(b);
    // storage.setItem("timestr", inputtime);
    // let num = parseInt(100 * Math.random()) + '' + randcode() + '-' + parseInt(100 * Math.random()) + '' + randcode();
    // if ()

    if (name.length == 0 && ema.length == 0 && content.length == 0) {
        err1.style.visibility = "visible";
        err2.style.visibility = "visible";
        err3.style.visibility = "visible";

    }
    if (name.length == 0 && ema.length == 0 && content.length != 0) {
        err1.style.visibility = "visible";
        err2.style.visibility = "visible";
    }
    if (name.length == 0 && ema.length != 0 && content.length == 0) {
        err1.style.visibility = "visible";
        err3.style.visibility = "visible";
    }
    if (name.length != 0 && ema.length == 0 && content.length == 0) {
        err2.style.visibility = "visible";
        err3.style.visibility = "visible";
    }
    if (name.length != 0 && ema.length != 0 && content.length == 0) {
        err3.style.visibility = "visible";
    }
    if (name.length != 0 && emreg.test(ema) == false && content.length != 0) {
        err2.style.visibility = "visible";
    }
    if (name.length != 0 && ema.length == 0 && content.length != 0) {
        err2.style.visibility = "visible";
    }
    if (name.length == 0 && ema.length != 0 && content.length != 0) {
        err1.style.visibility = "visible";
    }
    if (name.length != 0 && ema.length != 0 && content.length != 0 && emreg.test(ema) == true) {
        // let obj = { name: name, email: ema, content: content };
        // 生成key
        fetch(`http://localhost:3280/api/add`, {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({
                name: name,
                email: ema,
                time: inputtime,
                content: content,
                tip: tipmessage
            })
        }).then(res => {
            // let Res = res.json() // 返回一个Promise，可以解析成JSON
            // window.location.href = `put_done.html?k=${res.json().id}`
            // console.log(res.text());
            return res.text()
        }).then(res => {
            // console.log(res.id);
            JSON.parse(res);
            console.log(JSON.parse(res));
            console.log(JSON.parse(res).id);
            window.location.href = `put_done.html?k=${JSON.parse(res).id}`
        })

        // fetch(`http://localhost:3280/api/get`, {
        //         method: 'get',
        //         headers: {
        //             'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
        //         }
        //     }).then((res) => {
        //         return res.json() // 返回一个Promise，可以解析成JSON
        //     }).then((res) => {
        //         console.log(res) // 获取JSON数据
        //     })
        // window.location.href = "put_done.html";
        return false;
    }

}