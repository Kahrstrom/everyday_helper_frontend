import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FormRegister from '../form_register';
import { PrivateRoute } from '../privateroute';
import './index.css';

const PublicApp = () => (
   <div className="publicApp">
      <main className="md-cell md-cell--3-desktop-offset md-cell--6-desktop md-cell--0-tablet-offset md-cell--12-tablet">
         <Switch>
            <Route path='/public/register' component={ FormRegister } />
         </Switch>
      </main>
   </div>
);

export default PublicApp;