import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Convert from '../pages/Convert';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/convert" component={Convert} exact />
    </Switch>
  </Router>
);

export default Routes;
