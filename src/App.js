import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import Home from './containers/Home'
// import Admin from './containers/Admin'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/admin" component={Admin} /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
