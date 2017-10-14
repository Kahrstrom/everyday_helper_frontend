import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import { Card, CardTitle, CardActions } from 'react-md/lib/Cards/';
import { register } from '../../actions/session';
import FontIcon from 'react-md/lib/FontIcons';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { RenderTextField } from '../render_input';
import { Loader } from '../loader';
import './index.css';

function validate(values) {
   const errors = {};
   if (!values.name){
      errors.name = 'Please fill in your firstname';
   }
   if (!values.email){
      errors.email = 'Please fill in your email';
   }
   if (!values.account_name){
        errors.account_name = 'Please fill in your firstname';
   }  
   if (!values.username){
      errors.username = 'Please fill in your username';
   }
   if (!values.password){
      errors.password = 'Please fill in your password';
   }
   return errors;
}

class FormRegister extends Component {

    onSubmit(props, dispatch) {
        this.props.register(props);
    }

    render() { 

        if(this.props.session.loading) {
            return (<Loader id="registerloader" scale={2} loaderSize="medium" />);
        }
        const { handleSubmit } = this.props;
        return (
            <form className="register-form" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <Card className="md-grid">
                    <CardTitle className="register-title" title="Register" subtitle="Sign up to access all the cool stuff!" />
                    <div className="md-cell md-cell--12">
                        <Field leftIcon={<FontIcon>face</FontIcon>} name="name" maxLength={100} label="Name" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field leftIcon={<FontIcon>email</FontIcon>} name="email" maxLength={100} label="Email" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field leftIcon={<FontIcon>supervisor_account</FontIcon>} name="account_name" maxLength={100} label="Account" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field leftIcon={<FontIcon>account_circle</FontIcon>} name="username" maxLength={100} label="Username" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field leftIcon={<FontIcon>vpn_key</FontIcon>}name="password" type="password" maxLength={100} label="Password" component={RenderTextField} className="md-cell md-cell--12" />
                    </div>
                    <CardActions centered className="md-grid">
                        <Button className='md-cell--12' primary raised type="submit">Register</Button>
                        <div className='register-form-footertext md-cell--12'>Already got an account? Log in  <Link to='/public/login'>here!</Link></div>
                    </CardActions>
                </Card>
            </form>
        )
    }
}

FormRegister = reduxForm({
   form: 'FormRegister',
   fields: ['name', 'email', 'account_name', 'username', 'password'],
   validate
})(FormRegister);

FormRegister = connect( 
    (state) => {
        console.log(state);
        return { session: state.session }
    }, 
    (dispatch) => {
        return {
            register: (data) => dispatch(register(data))
        };
    }
)(FormRegister);

export default FormRegister;