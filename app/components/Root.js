import React from 'react';
import { HashRouter as Router, Route, Switch, DefaultRoute } from 'react-router-dom';
import StoreKey from './StoreKey';

const Root = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path={'/store-key'} component={StoreKey} />
        <Route component={StoreKey} />
      </Switch>
    </div>
  </Router>
);

export default Root;
