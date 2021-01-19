import React from 'react'

import Homepage from './compenents/Homepage'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './compenents/Login'
import Register from './compenents/SpacePersonal/Register'

import Information from './compenents/SpacePersonal/Information'
import Application from './compenents/SpacePersonal/Application'


function Dest() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register}/>
        <Route path="/information" exact component={Information}/>
        <Route path="/application" exact component={Application}/>
        
      </Switch>
    </Router>
  )
}

export default Dest
