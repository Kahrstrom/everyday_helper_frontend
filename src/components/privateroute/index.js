import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({component: ComposedComponent, ...rest}) => {
   class Authentication extends Component {
      handleRender(props) {
         if (!this.props.session.valid) {
            return <Redirect to={{
               pathname: '/public/register',
               state: {
                  from: props.location,
                  message: 'You need to log in'
               }
            }} />

         } else {
            return <ComposedComponent {...props} />
         }
      }
      render() {
         return (
            <Route {...rest} render={this.handleRender.bind(this)} />
         )
      }
   }

   function mapStateToProps(state) {
      return { session: state.session };
   }

   const AuthenticationContainer = connect(mapStateToProps)(Authentication)
   return <AuthenticationContainer/>;
}
