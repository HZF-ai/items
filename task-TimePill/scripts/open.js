function openit() {
    let storage = window.localStorage;
    let getinputtime = storage.getItem("keytime");
    let usertime = (new Date(getinputtime)).getTime();
    let currenttime = Date.now();
    let gettext = document.getElementById("getcon").value;
    let hh = storage.getItem("kkey");
    let h2 = document.getElementById("h2");
    let final = document.getElementById("final");
    let tip = document.getElementById("tip")
    if (currenttime > usertime && gettext == hh) {

        h2.innerHTML = storage.getItem("name-key") + '在' + storage.getItem("keytime") + '对你说';
        final.innerHTML = storage.getItem("tipmessage-key");
        // alert("ok")
    } else {
        let gap = Math.trunc((usertime - currenttime) / 1000);
        h2.innerHTML = "这颗胶囊未到提取时间，不能打开";
        final.innerHTML = "打开时间在：" + getinputtime + " 距离现在" + gap + '秒';
        // alert("no");
        tip.innerHTML = storage.getItem("name-key") + ' 给你留的提示信息：' + storage.getItem("tipmessage-key");
    }
    return false;
}