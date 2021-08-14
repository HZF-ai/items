function randcode() {
    let str = "";
    for (var i = 0; i < 2; i++) {
        str += String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));

    }
    return str;
}

window.onload = function() {

    // let num = parseInt(100 * Math.random()) + '' + randcode() + '-' + parseInt(100 * Math.random()) + '' + randcode() + '-' + randcode() + '' + parseInt(100 * Math.random()) + '-' + randcode() + '' + parseInt(100 * Math.random());
    // let storage = window.localStorage;
    // storage.setItem("kkey", num);
    // let getnum = storage.getItem("kkey");
    // fetch(`http://localhost:8200/api/get`,)
    // k.value = getnum;
    // storage.setItem("ran-key", getnum);
    // let res = fetch(`http://localhost:3280/api/get`)
    // let json = res.json()
    // console.log(json)
    // fetch(`http://localhost:3280/api/get`, {
    //     method: 'get',
    //     headers: {
    //         'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
    //     }
    // }).then((res) => {
    //     return res.json() // 返回一个Promise，可以解析成JSON
    // }).then((res) => {
    //     console.log(res) // 获取JSON数据
    // })
    // let res = await fetch('data/task.json')
    // let json = await res.json()
    // console.log(json)
    // async () => {
    //     let res = await fetch('http://localhost:3280/api/get')
    //     let json = await res.json()
    //     console.log(json)
    //   }
    let kk = document.getElementById("keycode");
    console.log(window.location.href);
    let opt = window.location.href.split('=')[1];
    kk.value = opt;

}