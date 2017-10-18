import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import Home from './containers/Home'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
