import React from 'react';
import { HashRouter as Router, Route, Switch, DefaultRoute } from 'react-router-dom';
import Main from './Main';
import { NotificationContainer } from 'react-notifications';


const Root = () => (
  <Router>
    <div>
    <NotificationContainer />
      <Switch>
        <Route exact path={'/store-key'} component={Main} />
        <Route component={Main} />
      </Switch>
    </div>
  </Router>
);

export default Root;
