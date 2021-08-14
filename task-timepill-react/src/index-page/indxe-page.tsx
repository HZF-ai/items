import React = require("react");
import { render } from "react-dom";
import ReactDOM = require("react-dom");
// import './index-style.css'
// import * as React from 'react'
import style from "./index-page-style.less";
import logo_big from "./imgs/logo_big.png"

export default class Indexpage extends React.Component {
    render() {
        return (
            <>
                <div className={style.homemain}>
                    <img className={style.logobig} src={logo_big} alt="" />
                    <h1 className={style.title}>时间胶囊</h1>
                    <div className={style.action}>
                        <a className={style.put} href="">
                            <span>Put</span> "添加"
                        </a>
                        <a className={style.add} href="">
                            <span>Put</span> "打开"
                        </a>
                    </div>
                    <div className={style.homefooter}>
                        <a href="/open/38e7687f-15e4-263c-8a8c-bb1d89ea49e0">什么是时间胶囊？</a> "."
                        <a href="http://www.timepill.net/">回胶囊日记</a>
                    </div>
                </div>
            </>
            
        )
    }
}

ReactDOM.render(<Indexpage />, document.getElementById('app'))