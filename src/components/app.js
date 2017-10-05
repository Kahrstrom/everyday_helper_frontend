import React, { Component } from 'react';
import './app.css';
import PrivateApp from './privateapp';
import PublicApp from './publicapp';
import { PrivateRoute } from './privateroute';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  
  render() {
    console.log("App loaded...")
    return (
      <Switch>
         <Route path='/public/' component={ PublicApp } />
         <PrivateRoute path='/' component={ PrivateApp } />
      </Switch>
    );
  }
}

export default App;
