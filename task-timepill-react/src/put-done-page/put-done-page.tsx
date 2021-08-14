
import React = require("react");
import { render } from "react-dom";
import ReactDOM = require("react-dom");
import style from "./put-done-page-style.less";
export default class Putdonepage extends React.Component {
   
    // componentDidMount() {
        // let kk:HTMLElement = document.getElementById("keycode");
        // // console.log(window.location.href);
        // let opt = window.location.href.split('=')[1];
        // kk.value = opt;
    // }
    declare state: {
        value:''
    }
    onChange(e) {
        let kk:HTMLElement = document.getElementById("keycode");
        // console.log(window.location.href);
        let opt = window.location.href.split('=')[1];
        this.setState({
        [e.target.value] : opt
          })
      
    }
    render() {
        return (
            <>
            <div className={style.header}>
                <div className={style.container}>
                    <a className={style.logo} href="/">时间胶囊</a>


                <ul className={style.nav}>
                    <li><a href="/task-timepill-fetch/index.html">首页</a></li>
                    <li><a href="/task-timepill-fetch/put.html">添加</a></li>
                    <li><a href="/task-timepill-fetch/open.html">打开</a></li>
                </ul>
                <ul className={style.nav_navuser}>
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
                <form >
                            <label>胶囊Key：
                                <input id="keycode" name="key" value={this.state.value} onChange={this.onChange.bind(this)} className={style.st} type="text"/>
                                <input type="submit"  value="你可以复制 key自己保存，也可以发送给你的好友，让他来打开胶囊。"/>
                                    
                        </label>
                </form>
            </div>
            </div>   
            </>
        )
    }
}

ReactDOM.render(<Putdonepage />, document.getElementById('app'))
function componentDidMount() {
    throw new Error("Function not implemented.");
}

