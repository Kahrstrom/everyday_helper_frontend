import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    fetchTodos, 
    selectTodo, 
    creatingTodo, 
    editTodo, 
    cancelEdit,
    checkFilterDone, 
    checkFilterMine 
} from '../../actions/todo';
import TodoList from '../todo_list';
import { Button, FontIcon, Toolbar, SelectionControl } from 'react-md';
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

    onChangeDoneFilter(checked) {
        this.props.checkFilterDone(checked);
    }

    onChangeMineFilter(checked, event) {
        this.props.checkFilterMine(checked);
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
            <main className="page-container">
                <Toolbar 
                    prominent
                    title="Filter"
                    zDepth={2}
                    children={
                        <div className="md-grid">
                            <SelectionControl
                                className="md-cell md-cell--6-desktop md-cell--4-mobile" 
                                id="show-done"
                                type="switch"
                                label="Show done to-do"
                                name="done"
                                onChange={(checked) => this.onChangeDoneFilter((checked))}
                                defaultChecked={this.props.filterDone}
                                value={this.props.filterDone}
                            />
                            <SelectionControl
                                className="md-cell md-cell--6-desktop md-cell--4-mobile" 
                                id="show-only-mine"
                                type="switch"
                                label="Show only mine"
                                name="mine"
                                onChange={(checked) => this.onChangeMineFilter((checked))}
                                defaultChecked={this.props.filterMine}
                                value={this.props.filterMine}
                            />
                        </div>
                    }
                />
                <section className="md-grid">
                    
                    <div className="md-cell md-cell--8-desktop md-cell--2-desktop-offset">
                        <TodoList
                            filterDone={this.props.filterDone}
                            filterMine={this.props.filterMine}
                            user={this.props.session.user}
                            handleSelect={(todo) => this.select(todo)} 
                            todos={this.props.todo.todos} 
                        />
                    </div>
                   
                    <TodoDrawer visible={this.props.editing} onVisibilityChange={() => this.setTodoVisibility()} todo={this.props.todo} />
                </section>
                <Button className="fab" floating secondary onClick={() => this.addTodo()}><FontIcon>add</FontIcon></Button>
            </main>
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        select: (todo) => dispatch(selectTodo(todo)),
        fetch: (auth_token) => dispatch(fetchTodos(auth_token)),
        creating: () => dispatch(creatingTodo()),
        cancelEdit: () => dispatch(cancelEdit()),
        edit: () => dispatch(editTodo()),
        checkFilterDone: (checked) => dispatch(checkFilterDone(checked)),
        checkFilterMine: (checked) => dispatch(checkFilterMine(checked))
    };
};

const mapStateToProps = (state) => {
    return {
        session: state.session,
        todo: state.todo,
        editing: state.todo.editing,
        filterDone: state.todo.filterDone,
        filterMine: state.todo.filterMine
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTodo);