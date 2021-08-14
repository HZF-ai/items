import * as React from 'react'
import ReactDOM = require('react-dom')
import { RouteComponentProps, Link, BrowserRouter, Route, Switch } from 'react-router-dom'

import indexpage from './index-page/indxe-page'
import putpage from './put-page/put-page'
import openpage from './open-page/open-page'
import putdonepage from './put-done-page/put-done-page'
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={indexpage} />
          <Route path="/put-page" component={putpage} />
          <Route path="/open-page" component={openpage} />
          <Route path="/put-done-page" component={putdonepage} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      
    </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))


// 用来写路由

