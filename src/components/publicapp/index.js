import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FormRegister from '../form_register';
import { PrivateRoute } from '../privateroute';
import { PublicRoute } from '../publicroute';
import './index.css';

const PublicApp = () => (
   <div className="publicApp">
      <main className="md-cell md-cell--4-desktop-offset md-cell--4-desktop md-cell--0-tablet-offset md-cell--12-tablet">
         <Switch>
            <PublicRoute path='/public/register' component={ FormRegister } />
         </Switch>
      </main>
   </div>
);

export default PublicApp;