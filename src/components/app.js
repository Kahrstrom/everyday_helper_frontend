import React, { Component } from 'react';
import { connect } from 'react-redux';
import './app.css';
import PrivateApp from './privateapp';
import PublicApp from './publicapp';
import { PrivateRoute } from './privateroute';
import { Switch, Route } from 'react-router-dom';
import Snackbar from 'react-md/lib/Snackbars';
import { hideToast } from '../actions/ui';
import { withRouter } from 'react-router-dom'

class App extends Component {
  hideToast = () => {
    this.props.hideToast();
  }
  render() {
    if(this.props.auth_token !== '') {
      return (
        <div>
          <PrivateApp />
          <Snackbar
            className="green"
            id="example-snackbar"
            toasts={this.props.snackbar.toasts}
            autohide={false}
            onDismiss={this.hideToast}
          />
        </div>
      )
    }
    return (
      <div>
        {/* <PublicApp /> */}
        <Switch>
          <Route path='/public/' component={ PublicApp } />
          <PrivateRoute path='/' component={ PrivateApp } />
        </Switch>
        <Snackbar
          className="green"
          id="example-snackbar"
          toasts={this.props.snackbar.toasts}
          autohide={false}
          onDismiss={this.hideToast}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    snackbar: state.ui.snackbar,
    auth_token: state.session.auth_token
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
     hideToast: () => dispatch(hideToast())
   }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
