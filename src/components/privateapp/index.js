import React, { Component } from 'react';
import AppBar from '../appbar';
import Main from '../main';

class PrivateApp extends Component {
  
  render() {
    console.log("App loaded...")
    return (
      <div>
         <AppBar />
         <Main />
      </div>
    );
  }
}

export default PrivateApp;
