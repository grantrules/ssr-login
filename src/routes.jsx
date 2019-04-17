import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Index from './pages/Index';
import Private from './pages/Private';

export default () => (
  <Switch>
    <Route exact path="/" component={Index} />
    <Route path="/login" component={Login} />
    <Route path="/private" component={Private} />
  </Switch>
);
