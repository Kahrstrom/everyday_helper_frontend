import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import { Card, CardTitle, CardActions } from 'react-md/lib/Cards/';
import { logIn } from '../../actions/session';
import { showToast } from '../../actions/ui';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { RenderTextField } from '../render_input';
import './index.css';

function validate(values) {
   const errors = {};

   if (!values.email){
      errors.email = 'Please fill in your email';
   }
   if (!values.account_name){
        errors.account_name = 'Please fill in your firstname';
   }  
   if (!values.password){
      errors.password = 'Please fill in your password';
   }
   return errors;
}

class FormLogin extends Component {

    onSubmit(props, dispatch) {
        this.props.login(props);
    }

    render() { 

        if(this.props.session.loading) {
            return (<div>Loading...</div>);
        }
        const { handleSubmit, reset } = this.props;
        return (
            <form className="login-form" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <Card>
                    <CardTitle className="login-title" title="Sign in" subtitle="Sign in to access all the cool stuff!" />
                    <div className="md-cell--10-desktop md-cell--1-desktop-offset">
                        <Field leftIcon={<FontIcon>email</FontIcon>} name="email" maxLength={100} label="Email" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field leftIcon={<FontIcon>supervisor_account</FontIcon>} name="account_name" maxLength={100} label="Account" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field leftIcon={<FontIcon>vpn_key</FontIcon>}name="password" type="password" maxLength={100} label="Password" component={RenderTextField} className="md-cell md-cell--12" />
                    </div>
                    <CardActions centered className="md-grid">
                        <Button className='md-cell--12' primary raised type="submit">Sign in</Button>
                        <div className='login-form-footertext md-cell--12'>Not a member? Sign up <Link to='/public/register'>here!</Link></div>
                    </CardActions>
                </Card>
            </form>
        )
    }
}

FormLogin = reduxForm({
   form: 'FormLogin',
   fields: ['email', 'account_name', 'password'],
   validate
})(FormLogin);

FormLogin = connect( 
    (state) => {
        return { session: state.session }
    }, 
    (dispatch) => {
        return {
            login: (data) => dispatch(logIn(data))
        };
    }
)(FormLogin);

export default FormLogin;