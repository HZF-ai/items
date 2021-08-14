// console.log(getname, getemail, getcontent, gettipmessage);
// alert(getname);
// alert(getemail);
// alert(getcontent);
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

    let err1 = document.getElementById("err1");
    let err2 = document.getElementById("err2");
    let err3 = document.getElementById("err3");
    // alert(name);
    // alert(ema);
    // alert(console);
    // alert(tipmessage);
    let storage = window.localStorage;
    // alert(name);
    //保存数据
    let setname = storage.setItem("name-key", name);
    let setemail = storage.setItem("email-key", ema);
    let setcontent = storage.setItem("content-key", content);
    let settipmessage = storage.setItem("tipmessage-key", tipmessage);
    // console.log(setname, setemail, setcontent, settipmessage);
    // 获取数据
    let getname = storage.getItem("name-key");
    let getemail = storage.getItem("email-key");
    let getcontent = storage.getItem("content-key");
    let gettipmessage = storage.getItem("tipmessage-key");
    let inputtime = document.getElementById("inputtime").value;
    let emreg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    storage.setItem("keytime", inputtime);
    // alert(typeof(inputtime));
    // alert(inputtime);
    // let a = new Date();
    // alert(a.getTime());
    // let b = (new Date(inputtime)).getTime();
    // alert(b);
    storage.setItem("timestr", inputtime);
    // let num = parseInt(100 * Math.random()) + '' + randcode() + '-' + parseInt(100 * Math.random()) + '' + randcode();
    // if ()

    if (getname.length == 0 && getemail.length == 0 && getcontent.length == 0) {
        err1.style.visibility = "visible";
        err2.style.visibility = "visible";
        err3.style.visibility = "visible";

    }
    if (getname.length == 0 && getemail.length == 0 && getcontent.length != 0) {
        err1.style.visibility = "visible";
        err2.style.visibility = "visible";
    }
    if (getname.length == 0 && getemail.length != 0 && getcontent.length == 0) {
        err1.style.visibility = "visible";
        err3.style.visibility = "visible";
    }
    if (getname.length != 0 && getemail.length == 0 && getcontent.length == 0) {
        err2.style.visibility = "visible";
        err3.style.visibility = "visible";
    }
    if (getname.length != 0 && getemail.length != 0 && getcontent.length == 0) {
        err3.style.visibility = "visible";
    }
    if (getname.length != 0 && emreg.test(getemail) == false && getcontent.length != 0) {
        err2.style.visibility = "visible";
    }
    if (getname.length != 0 && getemail.length == 0 && getcontent.length != 0) {
        err2.style.visibility = "visible";
    }
    if (getname.length == 0 && getemail.length != 0 && getcontent.length != 0) {
        err1.style.visibility = "visible";
    }
    if (getname.length != 0 && getemail.length != 0 && getcontent.length != 0 && emreg.test(getemail) == true) {
        // let obj = { name: getname, email: getemail, content: getcontent };
        // 生成key

        window.location.href = "put_done.html";
        // window.event.returnValue = false;
        // return false;
        // let keynum = document.getElementById("keycode");
        // storage.setItem("key-code", num);
        // let getkey = storage.getItem("key-code");
        // 将key写入input框中

        // alert(getkey);
        // alert(getname);
        // alert(getemail);
        // alert(getcontent);
        // alert(gettipmessage);
        // keynum.value = getkey;
        return false;
    }

}