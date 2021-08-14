import * as React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import Login from '../Login'
import Rich from '../Rich'
import Order from '../Order'
import Goods from '../Goods'
import Index from '../Goods_Set'
import Goods_Add from '../Goods_Add'

export default class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/rich" component={Rich} />
            <Route path="/order" component={Order} />
            <Route path="/goods/add" component={Goods_Add} />
            <Route path="/goods/set" component={Index} />
            <Route path="/goods" component={Goods} />
            <Redirect from="/" to="/login" exact />
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    )
  }
}
