import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Convert from '../pages/Convert';
import Market from '../pages/Market';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/convert" component={Convert} />
      <Route path="/market/:id" component={Market} />
    </Switch>
  </Router>
);

export default Routes;
