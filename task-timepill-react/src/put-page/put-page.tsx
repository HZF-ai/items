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
            // ??????key
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
                // let Res = res.json() // ????????????Promise??????????????????JSON
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
            //             'Accept': 'application/json' // ??????????????????????????????????????????JSON
            //         }
            //     }).then((res) => {
            //         return res.json() // ????????????Promise??????????????????JSON
            //     }).then((res) => {
            //         console.log(res) // ??????JSON??????
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
                        <a className={style.logo} href="/">????????????</a>
                        <ul className={style.nav}>
                            <li><Link to="/indexpage"><a>??????</a></Link></li>
                            <li><Link to="/putpage"><a>??????</a></Link></li>
                            <li><Link to="/openpage"><a>??????</a></Link></li>
                        </ul>
                        <ul className={style.nav_nacuser}>
                            <li>
                                <a href="">
                                    ???????????????
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className={style.container}>
                    <h1 className={style.pageheader}>????????????</h1>
                    <div  className={style.main}>

                        <form action="">
                            <label>????????????</label>
                            <div id="err1" className={style.err1}>?????? ????????????.</div>
                            <input id="username" name="name"  className={style.forminputwidth} type="text"
                            />
                            <label>????????????</label>
                            <div id="err2" className={style.err2}>?????? ??????????????????????????????????????????.</div>
                            <input id="useremail" name="email"  className={style.forminputwidth} type="text"/>
                            <label>????????????</label>
                            <input id="inputtime" name="time" value="2021-07-16 17:24:15" className={style.forminputwidth} type="text"/>
                            <span className={style.tips}>???????????????????????????????????????????????????</span>
                            <label>????????????</label>
                            <div id="err3" className={style.err3}>?????? ????????????.</div>
                            <textarea id="usercontent" name="content" value="" className={style.forminputmarginbottom} rows={this.state.row1} cols={this.state.col}></textarea>
                            <br />
                            <span className={style.tips}>????????????????????????5000??????</span>
                            <label className={style.margintop} >?????????????????????</label>
                            <textarea id="usertipmessage" name="tips" value="" className={style.forminputmarginbottom} rows={this.state.row2} cols={this.state.col}></textarea>
                            <br />
                            <span className={style.tips}>??? ???????????? ?????????????????????????????????????????????</span>
                            <p className="form-p" >
                                <input onClick={this.sub} id="submit" type="button" value="????????????"/>
                            </p>
                        </form>
                    </div>
                </div>
                
            </>
        )
                  
    }
}

ReactDOM.render(<Putpage />, document.getElementById('app'))