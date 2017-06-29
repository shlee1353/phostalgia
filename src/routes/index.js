import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './App'
import ErrorPage from './ErrorPage'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  )
};

export default Routes
