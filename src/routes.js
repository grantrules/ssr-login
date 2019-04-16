import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Index from './pages/Index';

export default () =>
	<>
		<Switch>
		<Route exact path="/" component={Index} />
		<Route path="/login" component={Login} />
		</Switch>
	</>
