import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import { saveTodo, deleteTodo } from '../../actions/todo';
import FontIcon from 'react-md/lib/FontIcons';
import { Field, reduxForm } from 'redux-form';
import { 
    RenderTextField, 
    RenderSelectField, 
    RenderCheckBox, 
    RenderDatePicker, 
    RenderTimePicker 
} from '../render_input';
import { Loader } from '../loader';
import './index.css';


function validate(values) {
   const errors = {};
   if (!values.title){
      errors.title = 'Please fill in a title';
   }
   if (!values.date){
        errors.date = 'Please fill in a date';
   }  
   if (!values.user){
      errors.password = 'Please fill in your password';
   }
   return errors;
}

class FormTodo extends Component {

    onSubmit(props, dispatch) {
        const todo = Object.assign({}, this.props.todo.activeTodo )
        const date = props.date.split('T');
        const time = props.time.split('T');
        props.date = date[0] + 'T' + time[time.length-1];
        this.props.save(this.props.session.auth_token, Object.assign({}, todo, props, { user_id: props.user}));
    }

    delete() {
        this.props.delete(this.props.session.auth_token, this.props.initialValues.id);
    }

    render() { 
        const { handleSubmit, todo } = this.props;
        const user = this.props.initialValues.user || this.props.session.user.id;
        return (
            <form className="todo-form md-grid" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <div className="md-cell md-cell--12">
                    <Field name="title" leftIcon={<FontIcon>title</FontIcon>} maxLength={100} label="Title" component={RenderTextField} className="md-cell--12" />
                    <Field name="date" label="Date" component={RenderDatePicker} className="md-cell--12" />
                    <Field name="time" label="Time" displayMode="portrait" component={RenderTimePicker} className="md-cell--12" />
                    <Field name="description" leftIcon={<FontIcon>description</FontIcon>} maxLength={400} label="Description" component={RenderTextField} rows={1} maxRows={6} className="md-cell--12" />
                    <Field name="done" defaultChecked={this.props.initialValues.done} label="Done" component={RenderCheckBox} className="md-cell--12" />
                    <Field name="user" label="Responsible" component={RenderSelectField} defaultValue={user} menuItems={this.props.users.map((user) => {return {id: user.id, name: user.name}})} className="md-cell--12" itemValue="id" itemLabel="name" />
                    <Button className="md-cell--12 btn-centered btn-save" iconEl={<FontIcon>description</FontIcon>} secondary raised type="submit">Save</Button>
                    {this.props.initialValues.id &&
                        <Button className="md-cell--12 btn-centered btn-delete" iconEl={<FontIcon>delete_forever</FontIcon>} secondary raised onClick={() => this.delete()}>Delete</Button>
                    }
                </div>
            </form>
        )
    }
}


FormTodo = reduxForm({
   form: 'FormTodo',
   fields: ['done', 'date', 'time', 'title', 'description', 'user'],
   validate
})(FormTodo);

FormTodo = connect( 
    (state) => {
        const initialValues = Object.assign({}, state.todo.activeTodo);
        initialValues.user = state.todo.activeTodo.user ? state.todo.activeTodo.user.id : 0;
        initialValues.time = state.todo.activeTodo.date;
        return { 
            session: state.session,
            initialValues,
            users: state.user.users
        }
    }, 
    (dispatch) => {
        return {
            save: (auth_token, todo) => dispatch(saveTodo(auth_token, todo)),
            delete: (auth_token, id) => dispatch(deleteTodo(auth_token, id))
        };
    }
)(FormTodo);

export default FormTodo;