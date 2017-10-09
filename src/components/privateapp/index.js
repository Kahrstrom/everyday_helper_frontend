import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import { hideToast } from '../../actions/ui';
import { logOut } from '../../actions/session';

import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import Divider from 'react-md/lib/Dividers';
import { ListItem } from 'react-md/lib/Lists';
import FontIcon from 'react-md/lib/FontIcons';


import Home from '../home';
import AdminRoute from '../adminroute';
import { PrivateRoute } from '../privateroute';
import NavigationLink from '../navigation_link';
import './index.css';



class PrivateApp extends Component {
  navItems = [
    {
        type: 'link',
        to: '/client/',
        icon: 'home',
        label: 'Home',
        exact: true
    },
    {
        type: 'link',
        to: '/client/todo',
        icon: 'alarm',
        label: 'To-dos',
        exact: true
    },
    {
        type: 'link',
        to: '/client/shopping-list',
        icon: 'shopping_cart',
        label: 'Shopping',
        exact: true
    },
    {
        type: 'divider',
        key: 'divider-1'
    },
    {
        type: 'link',
        to: '/client/admin',
        icon: 'account_box',
        label: 'Admin page',
        disabled: true,
        exact: true
    },
    {
        type: 'button',
        click: () => { this.props.logout(this.props.auth_token) },
        icon: 'exit_to_app',
        label: 'Sign out',
        key: 'logout'
    }
  ];



   hideToast = () => {
      this.props.hideToast();
   }

   addLink = (props) => {
      switch(props.type) {
        case 'divider':
          return <Divider key={props.key} />;
        case 'link':
          return <NavigationLink {...props} key={props.to} />
        case 'button':
          return <ListItem onClick={props.click} primaryText={props.label} leftIcon={<FontIcon>{props.icon}</FontIcon>} key={props.key}/>;
     }
   }

   render () {
      return (
          <NavigationDrawer
            transitionEnterTimeout={undefined}
            transitionLeaveTimeout={undefined}
            drawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
            drawerTitle='Navigate'
            toolbarTitle='Some title...'
            navItems={
               this.navItems.map(props => this.addLink(props))
            }
          >
            <Switch>
              <PrivateRoute exact path='/client' component={ Home } />
              <AdminRoute exact path='/client/admin' component={ Home } />
            </Switch>
         </NavigationDrawer>
      );
   }
}

const mapStateToProps = (state) => {
  return {
    auth_token: state.session.auth_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (auth_token) => dispatch(logOut(auth_token))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateApp));