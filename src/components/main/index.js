import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../home'
import { PrivateRoute } from '../privateroute';

const Main = () => (
   <main className="md-cell md-cell--3-desktop-offset md-cell--6-desktop md-cell--0-tablet-offset md-cell--12-tablet">
      <Switch>
         <PrivateRoute exact path='/client/' component={ Home } /> 
      </Switch>
   </main>
);

export default Main;