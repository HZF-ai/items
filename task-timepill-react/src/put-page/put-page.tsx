import React = require("react");
import ReactDOM = require("react-dom");
import { Link } from "react-router-dom";
import style from "./put-page-style.less";

export default class Putpage extends React.Component {
    declare state: {
        row1: 8,
        row2: 3,
        col:50,
    }
     sub() {
        let username:HTMLInputElement = document.getElementById("username").value;
        let userema:HTMLInputElement = document.getElementById("useremail").value;
        let usercontent:HTMLInputElement = document.getElementById("usercontent").value;
        let usertipmessage:HTMLInputElement = document.getElementById("usertipmessage").value;
        let userinputtime:HTMLInputElement = document.getElementById("inputtime").value;
         const name: string = username.innerHTML;
         const ema: string = userema.innerHTML;
         const content: string = usercontent.innerHTML;
         const tipmessage: string = usertipmessage.innerHTML;
         const inputtime: string = userinputtime.innerHTML;
        let err1 = document.getElementById("err1");
        let err2 = document.getElementById("err2");
        let err3 = document.getElementById("err3");
        
        let emreg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
        let a;
        
    
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
                window.location.href = `put_done.html?k=${JSON.parse(res).id}`;
                
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

    render() {
        return (
            <>
                <div className={style.header}>
                    <div className={style.container}>
                        <a className={style.logo} href="/">时间胶囊</a>
                        <ul className={style.nav}>
                            <li><Link to="/indexpage"><a>首页</a></Link></li>
                            <li><Link to="/putpage"><a>添加</a></Link></li>
                            <li><Link to="/openpage"><a>打开</a></Link></li>
                        </ul>
                        <ul className={style.nav_nacuser}>
                            <li>
                                <a href="">
                                    回胶囊日记
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className={style.container}>
                    <h1 className={style.pageheader}>添加胶囊</h1>
                    <div  className={style.main}>

                        <form action="">
                            <label>你的名字</label>
                            <div id="err1" className={style.err1}>名字 必须填写.</div>
                            <input id="username" name="name"  className={style.forminputwidth} type="text"
                            />
                            <label>你的邮箱</label>
                            <div id="err2" className={style.err2}>邮箱 必须是一个有效的电子邮箱地址.</div>
                            <input id="useremail" name="email"  className={style.forminputwidth} type="text"/>
                            <label>打开时间</label>
                            <input id="inputtime" name="time" value="2021-07-16 17:24:15" className={style.forminputwidth} type="text"/>
                            <span className={style.tips}>打开时间之前，胶囊内容是看不到的。</span>
                            <label>胶囊内容</label>
                            <div id="err3" className={style.err3}>内容 必须填写.</div>
                            <textarea id="usercontent" name="content" value="" className={style.forminputmarginbottom} rows={this.state.row1} cols={this.state.col}></textarea>
                            <br />
                            <span className={style.tips}>胶囊内容不能超过5000字。</span>
                            <label className={style.margintop} >未到期提示信息</label>
                            <textarea id="usertipmessage" name="tips" value="" className={style.forminputmarginbottom} rows={this.state.row2} cols={this.state.col}></textarea>
                            <br />
                            <span className={style.tips}>在 打开时间 之前打开胶囊，会看到提示信息。</span>
                            <p className="form-p" >
                                <input onClick={this.sub} id="submit" type="button" value="添加胶囊"/>
                            </p>
                        </form>
                    </div>
                </div>
                
            </>
        )
                  
    }
}

ReactDOM.render(<Putpage />, document.getElementById('app'))