import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home'

const Routes = (props) => (
   <Router {...props}>
      <Route path="/" component={App}>
         <IndexRoute component={Home} />
      </Route>
   </Router>
);

export default Routes;
