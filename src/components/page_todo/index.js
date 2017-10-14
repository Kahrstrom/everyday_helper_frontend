import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodos, selectTodo, creatingTodo, editTodo, cancelEdit } from '../../actions/todo';
import TodoList from '../todo_list';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import { Loader } from '../loader';
import TodoDrawer from '../todo_drawer';

class PageTodo extends Component {
    fetch() {
        this.props.fetch(this.props.session.auth_token);
    }
    select(todo) {
        this.props.select(todo);
        this.props.edit();
    }

    addTodo() {
        this.props.creating(this.props.session.user);
    }

    setTodoVisibility() {
        if(this.props.editing) {
            this.props.cancelEdit();
        }else {
            this.props.edit();
        }
    }

    componentWillMount() {
        this.fetch();
    }
    render() {
        if(this.props.todo.loading) {
            return (
                <Loader id="todoloader" scale={2} loaderSize="medium" />
            );
        }

        return (
            <section className="md-grid">
                <Button className="fab" floating secondary onClick={() => this.addTodo()}><FontIcon>add</FontIcon></Button>
                <div className="md-cell md-cell--8-desktop md-cell--2-desktop-offset">
                    <TodoList
                        handleSelect={(todo) => this.select(todo)} 
                        todos={this.props.todo.todos} 
                    />
                </div>
                <TodoDrawer visible={this.props.editing} onVisibilityChange={() => this.setTodoVisibility()} todo={this.props.todo} />
            </section>
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        select: (todo) => dispatch(selectTodo(todo)),
        fetch: (auth_token) => dispatch(fetchTodos(auth_token)),
        creating: () => dispatch(creatingTodo()),
        cancelEdit: () => dispatch(cancelEdit()),
        edit: () => dispatch(editTodo())
    };
};

const mapStateToProps = (state) => {
    return {
        session: state.session,
        todo: state.todo,
        editing: state.todo.editing
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTodo);