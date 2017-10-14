import axios from 'axios';
import {ROOT_URL} from './index';
import { showToast } from './ui';

export const FETCHING_TODOS = 'FETCHING_TODOS';
export const FETCHING_TODOS_SUCCESS = 'FETCHING_TODOS_SUCCESS';
export const FETCHING_TODOS_FAILURE = 'FETCHING_TODOS_FAILURE';

export const SAVING_TODO = 'SAVING_TODO';
export const SAVING_TODO_SUCCESS = 'SAVING_TODO_SUCCESS';
export const SAVING_TODO_FAILURE = 'SAVING_TODO_FAILURE';

export const DELETING_TODO = 'DELETING_TODO';
export const DELETING_TODO_SUCCESS = 'DELETING_TODO_SUCCESS';
export const DELETING_TODO_FAILURE = 'DELETING_TODO_FAILURE';

export const SELECT_TODO = 'SELECT_TODO';

export const CREATING_TODO = 'CREATING_TODO';
export const CANCEL_EDIT_TODO = 'CANCEL_EDIT_TODO';
export const EDIT_TODO = 'EDIT_TODO';

function savingTodo(todo) {
    return {
       type: SAVING_TODO,
       todo
    }
 }
 
 function savingTodoSuccess(todo) {
    return {
       type: SAVING_TODO_SUCCESS,
       todo
    }
 }
 
 function savingTodoFailure(error) {
    return {
       type: SAVING_TODO_FAILURE,
       error
    }
 }

 function deletingTodo() {
    return {
       type: DELETING_TODO
    }
 }
 
 function deletingTodoSuccess() {
    return {
       type: DELETING_TODO_SUCCESS
    }
 }
 
 function deletingTodoFailure(error) {
    return {
       type: DELETING_TODO_FAILURE,
       error
    }
 }

 function fetchingTodos() {
    return {
       type: FETCHING_TODOS
    }
 }
 
 function fetchingTodosSuccess(todos) {
    return {
       type: FETCHING_TODOS_SUCCESS,
       todos
    }
 }
 
 function fetchingTodosFailure(error) {
    return {
       type: FETCHING_TODOS_FAILURE,
       error
    }
 }

 export function creatingTodo(user) {
     return {
         type: CREATING_TODO,
         user
     }
 }

 export function selectTodo(todo) {
     return {
         type: SELECT_TODO,
         todo
     }
 }

export function cancelEdit() {
    return {
        type: CANCEL_EDIT_TODO
    }
}

export function editTodo() {
    return {
        type: EDIT_TODO
    }
}
 
export function fetchTodos(auth_token) {
    return function (dispatch) {
        dispatch(fetchingTodos());
        try {
            return axios.get(`${ROOT_URL}/todo/`,
                { 
                    headers: {
                        'Authorization': 'Bearer ' + auth_token
                    }
                }
                )
                .then (response => { 
                    dispatch(fetchingTodosSuccess(response.data.data));
                })
                .catch(error => {
                    dispatch(fetchingTodosFailure(error));
                    dispatch(showToast({ text: error.response.data.message, action: 'OK'}));
                });
        }
        catch(error) {
            dispatch(fetchingTodosFailure(error));
            dispatch(showToast({ text: error, action: 'OK'}));
        }
    }
}

function updateTodo(dispatch, auth_token, todo) {
    return axios.put(`${ROOT_URL}/todo/${todo.id}/`, todo,
        { 
            headers: {
                'Authorization': 'Bearer ' + auth_token
            }
        }
        )
        .then (response => { 
            dispatch(savingTodoSuccess(response.data));
            dispatch(fetchTodos(auth_token));
            dispatch(showToast({ text: response.data.message, action: 'OK'}));
        })
        .catch(error => {
            dispatch(savingTodoFailure(error));
            dispatch(showToast({ text: error.response.data.message, action: 'OK'}));
        });
}

function createTodo(dispatch, auth_token, todo) {
    return axios.post(`${ROOT_URL}/todo/`, todo,
        { 
            headers: {
                'Authorization': 'Bearer ' + auth_token
            }
        }
        )
        .then (response => { 
            dispatch(savingTodoSuccess(response.data));
            dispatch(fetchTodos(auth_token));
            dispatch(showToast({ text: response.data.message, action: 'OK'}));
        })
        .catch(error => {
            dispatch(savingTodoFailure(error));
            dispatch(showToast({ text: error.response.data.message, action: 'OK'}));
        });
}

export function saveTodo(auth_token, todo) {
    return function (dispatch) {
        dispatch(savingTodo());
        if(todo.id) {
            updateTodo(dispatch, auth_token, todo);
        }
        else {
            createTodo(dispatch, auth_token, todo);
        }
    }
}


export function deleteTodo(auth_token, id) {
    return function (dispatch) {
        dispatch(deletingTodo());
        try {
            return axios.delete(`${ROOT_URL}/todo/${id}/`,
                { 
                    headers: {
                        'Authorization': 'Bearer ' + auth_token
                    }
                }
                )
                .then (response => { 
                    dispatch(deletingTodoSuccess());
                    dispatch(fetchTodos(auth_token));
                    dispatch(showToast({ text: response.data.message, action: 'OK'}));
                })
                .catch(error => {
                    dispatch(deletingTodoFailure(error));
                    dispatch(showToast({ text: error.response.data.message, action: 'OK'}));
                });
        }
        catch(error) {
            dispatch(deletingTodoFailure(error));
            dispatch(showToast({ text: error, action: 'OK'}));
        }
    }
}
