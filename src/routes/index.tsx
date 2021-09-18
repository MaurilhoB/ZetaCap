import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Home from "../pages/Home"

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/" component={Home} exact />
    </Switch>
  </Router>
)

export default Routes
