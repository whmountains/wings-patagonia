import React, { Component } from 'react'
import { Switch, Route } from 'react-router'

import Home from './Home/'
import ScenicFlights from './FlightsPage/'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/flights/scenic" component={ScenicFlights} />
        <Route exact path="/" component={Home} />
        {/* <Route path="/admin" component={Admin} /> */}
      </Switch>
    )
  }
}

export default App
