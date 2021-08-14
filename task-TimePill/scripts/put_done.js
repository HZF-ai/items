function randcode() {
    let str = "";
    for (var i = 0; i < 2; i++) {
        str += String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));

    }
    return str;
}

window.onload = function() {
    let k = document.getElementById("keycode");
    let num = parseInt(100 * Math.random()) + '' + randcode() + '-' + parseInt(100 * Math.random()) + '' + randcode() + '-' + randcode() + '' + parseInt(100 * Math.random()) + '-' + randcode() + '' + parseInt(100 * Math.random());
    let storage = window.localStorage;
    storage.setItem("kkey", num);
    let getnum = storage.getItem("kkey");
    k.value = getnum;
    storage.setItem("ran-key", getnum);
}