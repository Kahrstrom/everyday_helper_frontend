import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import { Card, CardTitle, CardActions } from 'react-md/lib/Cards/';
import { register } from '../../actions/session';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';
import { Field, reduxForm } from 'redux-form';
import { RenderTextField } from '../render_input';
import './index.css';

class FormRegister extends Component {

    onSubmit(props, dispatch) {
        this.props.register(props);
    }

   render() {

        if(this.props.session.loading) {
            return (<div>Loading...</div>);
        }
        const error = this.props.session.error ? <div>{this.props.session.error.toString()}</div> : <div></div>;
        const { handleSubmit, reset } = this.props;
        return (
            <form className="register-form" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <Card>
                    <CardTitle className="register-title" title="Register" subtitle="Sign up to access all the cool stuff!" />
                    <div className="md-cell--10-desktop md-cell--1-desktop-offset">
                        <Field leftIcon={<FontIcon>face</FontIcon>} name="name" maxLength={100} label="Name" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field leftIcon={<FontIcon>email</FontIcon>} name="email" maxLength={100} label="Email" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field leftIcon={<FontIcon>supervisor_account</FontIcon>} name="account_name" maxLength={100} label="Account" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field leftIcon={<FontIcon>account_circle</FontIcon>} name="username" maxLength={100} label="Username" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field leftIcon={<FontIcon>vpn_key</FontIcon>}name="password" type="password" maxLength={100} label="Password" component={RenderTextField} className="md-cell md-cell--12" />
                    </div>
                    {error}
                    <CardActions>
                        <Button primary raised type="submit">Register</Button>
                    </CardActions>
                </Card>
            </form>
        )
    }
}

function validate(values) {
   const errors = {};
   if (!values.name){
      errors.name = 'Please fill in your firstname';
   }
   if (!values.email){
      errors.email = 'Please fill in your email';
   }
   if (!values.account_name){
        errors.account = 'Please fill in your firstname';
   }  
   if (!values.username){
      errors.username = 'Please fill in your username';
   }
   if (!values.password){
      errors.password = 'Please fill in your password';
   }
   return errors;
}

FormRegister = reduxForm({
   form: 'FormRegister',
   fields: ['name', 'email', 'account_name', 'username', 'password'],
   validate
})(FormRegister);

FormRegister = connect( 
    (state) => {
        return { session: state.session }
    }, 
    (dispatch) => {
        return {
            register: (data) => dispatch(register(data))
        };
    }
)(FormRegister);

export default FormRegister;