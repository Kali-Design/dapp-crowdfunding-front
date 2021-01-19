import React from 'react'

import Homepage from './compenents/Homepage'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './compenents/Login'
import Personal from './compenents/Personal'


function Dest() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/login" exact component={Login} />
        <Route path="/personal" exact component={Personal} />
      </Switch>
    </Router>
  )
}

export default Dest
