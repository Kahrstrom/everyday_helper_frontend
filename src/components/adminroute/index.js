import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { showToast } from '../../actions/ui';

const AdminRoute = ({component: ComposedComponent, ...rest}) => {
   class Authentication extends Component {
      showToast(text) {
         this.props.showToast({text, action: 'Ok'})
      }

      componentWillMount() {
        if (!this.props.session.user.admin) {
            this.showToast('You do not have access to the admin pages');
        }
      }

      handleRender(props) {
         if (!this.props.session.user.admin) {
            
            return <Redirect to={{
               pathname: '/client',
               state: {
                  from: props.location,
                  message: 'You do not have access to the admin pages'
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

   const mapStateToProps = (state) => {
      return { session: state.session };
   }

   const mapDispatchToProps = (dispatch) => {
      return {
         showToast: (toast) => dispatch(showToast(toast))
      }
   }

   const AuthenticationContainer = connect(mapStateToProps, mapDispatchToProps)(Authentication)
   return <AuthenticationContainer/>;
}


export default AdminRoute;