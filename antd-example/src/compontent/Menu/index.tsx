import * as React from 'react'
import { RouteComponentProps, Link, withRouter } from 'react-router-dom'
import {  Menu } from 'antd'
import style from './style.less'
class SMenu extends React.Component<RouteComponentProps> {

    render(){
        return(
            <React.Fragment>
                <div className={style.sider}>
                    <Menu
                        mode="inline"
                        className={style.sider_menu}
                    >
                        <Menu.Item 
                            key="1" 
                            className={style.sider_button}
                            style={{paddingLeft:'0',paddingRight:'0'}}
                            onClick={() => {const {history} = this.props;history.push('/rich')}}
                        >富豪榜</Menu.Item>
                        <Menu.Item 
                            key="2" 
                            className={style.sider_button}
                            style={{paddingLeft:'0',paddingRight:'0'}}
                            onClick={() => {const {history} = this.props;history.push('/goods')}}
                        >商品管理</Menu.Item>
                        <Menu.Item 
                            key="3" 
                            className={style.sider_button}
                            style={{paddingLeft:'0',paddingRight:'0'}}
                            onClick={() => {const {history} = this.props;history.push('/order')}}
                        >订单管理</Menu.Item>
                    </Menu>
                </div>
                
            </React.Fragment>
        )
    }
}
export default withRouter(SMenu);