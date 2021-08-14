

import React = require("react");
import { render } from "react-dom";
import ReactDOM = require("react-dom");
import { Link } from "react-router-dom";
// import './index-style.css'
// import * as React from 'react'
import style from "./open-page-style.less";
// import logo_big from "./imgs/logo_big.png"
import indexpage from '../../src/index-page/indxe-page'
import putpage from '../../src/put-page/put-page'
import openpage from '../../src/open-page/open-page'
// import putdonepage from './put-done-page/put-done-page'
export default class Openpage extends React.Component {
    openit() {
        let currenttime = Date.now();
    
        let h2 = document.getElementById("h2");
        let final = document.getElementById("final");
    

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
                    <h1 className={style.pageheader}>打开胶囊</h1>
                    <div className={style.main}>
                        <form method="post" className={style.formbottom}>
                            <label>胶囊Key：
                                    <input id="getcon" name="key" value="" className={style.inputwidth} type="text"/>
                    
                                    <button id="open-jn" onClick={this.openit} type="button">打开胶囊</button>
                            </label>
                        </form>
                        <div className={style.pill}>
                            <div id="h2" className="show-content1"></div>
                                <br/>
                                <div id="final" className="show-content">
                                </div>
                                <div id="tip"></div>
                            </div>
                    </div>
                </div>
            </>
            
        )
    }
}

ReactDOM.render(<Openpage />, document.getElementById('app'))