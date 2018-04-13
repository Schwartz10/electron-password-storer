import React from 'react';
import { HashRouter as Router, Route, Switch, DefaultRoute } from 'react-router-dom';
import StoreKey from './StoreKey';
import { NotificationContainer } from 'react-notifications';


const Root = () => (
  <Router>
    <div>
    <NotificationContainer />
      <Switch>
        <Route exact path={'/store-key'} component={StoreKey} />
        <Route component={StoreKey} />
      </Switch>
    </div>
  </Router>
);

export default Root;
