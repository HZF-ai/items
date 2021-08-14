function openit() {
    // let storage = window.localStorage;
    // let getinputtime = storage.getItem("keytime");
    // let usertime = (new Date(getinputtime)).getTime();
    let currenttime = Date.now();
    // let gettext = document.getElementById("getcon").value;
    // let hh = storage.getItem("kkey");
    let h2 = document.getElementById("h2");
    let final = document.getElementById("final");
    // let tip = document.getElementById("tip")
    // if (currenttime > usertime && gettext == hh) {

    //     h2.innerHTML = storage.getItem("name-key") + '在' + storage.getItem("keytime") + '对你说';
    //     final.innerHTML = storage.getItem("tipmessage-key");
    //     // alert("ok")
    // } else {
    //     let gap = Math.trunc((usertime - currenttime) / 1000);
    //     h2.innerHTML = "这颗胶囊未到提取时间，不能打开";
    //     final.innerHTML = "打开时间在：" + getinputtime + " 距离现在" + gap + '秒';
    //     // alert("no");
    //     tip.innerHTML = storage.getItem("name-key") + ' 给你留的提示信息：' + storage.getItem("tipmessage-key");
    // }

    let Id = document.getElementById('getcon').value;
    console.log(Id);
    fetch(`http://localhost:3280/api/get`, {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
            id: Id
        })
    }).then(res => {
        // let Res = res.json() // 返回一个Promise，可以解析成JSON
        // window.location.href = `put_done.html?k=${res.json().id}`
        // console.log(res.text());
        return res.text()
    }).then(res => {
        // console.log(res.id);
        JSON.parse(res);
        // console.log(JSON.parse(res));
        // console.log(JSON.parse(res).id);
        // JSON.parse(res)
        let usertime = (new Date(JSON.parse(res).time)).getTime();
        // window.location.href = `put_done.html?k=${JSON.parse(res).id}`
        if (currenttime > usertime && Id == JSON.parse(res).id) {

            h2.innerHTML = JSON.parse(res).name + '在' + JSON.parse(res).time + '对你说';
            final.innerHTML = JSON.parse(res).tip;
            // alert("ok")
        }
        if (currenttime < usertime && Id == JSON.parse(res).id) {
            let gap = Math.trunc((usertime - currenttime) / 1000);
            h2.innerHTML = "这颗胶囊未到提取时间，不能打开";
            final.innerHTML = "打开时间在：" + JSON.parse(res).time + " 距离现在" + gap + '秒';
            // alert("no");
            tip.innerHTML = JSON.parse(res).name + ' 给你留的提示信息：' + JSON.parse(res).tip;
        }
        if (Id != JSON.parse(res).id) {
            h2.innerHTML = "胶囊未找到"
        }
    })

    return false;
}