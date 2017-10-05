import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import { Card, CardTitle, CardActions } from 'react-md/lib/Cards/';
import register from '../../actions/session';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';
import { Field, reduxForm } from 'redux-form';
import { RenderTextField } from '../render_input';

class FormRegister extends Component {

   onSubmit(props, dispatch) {
       console.log(props);
        register(props);
    }

   render() {
       console.log(this.props);
        const { handleSubmit, reset } = this.props;
        return (
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <Card >
                    <CardTitle title="Register" subtitle="Sign up to access all the cool stuff!" />
                    <div className="md-cell md-cell--8 md-cell--2--offset-desktop">
                        <Field name="firstname" maxLength={100} label="First Name" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field name="lastname" maxLength={100} label="Last Name" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field name="email" maxLength={100} label="Email" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field name="username" maxLength={100} label="Username" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field name="account" maxLength={100} label="Account" component={RenderTextField} className="md-cell md-cell--12" />
                        <Field name="password" type="password" maxLength={100} label="Password" component={RenderTextField} className="md-cell md-cell--12" />
                    </div>
                    <CardActions>
                        <Button raised type="submit">Hi</Button>
                    </CardActions>
                </Card>
            </form>
        )
    }
}

function validate(values) {
   const errors = {};
   if (!values.firstname){
      errors.firstname = 'Please fill in your firstname';
   }
   if (!values.lastname){
      errors.lastname = 'Please fill in your lastname';
   }
   if (!values.email){
      errors.email = 'Please fill in your email';
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
   fields: ['firstname', 'lastname', 'email', 'username', 'password'],
   validate
})(FormRegister);

FormRegister = connect(null, { register })(FormRegister);

export default FormRegister;