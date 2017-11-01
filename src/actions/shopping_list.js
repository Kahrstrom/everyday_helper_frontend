import axios from 'axios';
import {ROOT_URL} from './index';
import { showToast } from './ui';

export const FETCHING_SHOPPING_LISTS = 'FETCHING_SHOPPING_LISTS';
export const FETCHING_SHOPPING_LISTS_SUCCESS = 'FETCHING_SHOPPING_LISTS_SUCCESS';
export const FETCHING_SHOPPING_LISTS_FAILURE = 'FETCHING_SHOPPING_LISTS_FAILURE';

export const SAVING_SHOPPING_LIST = 'SAVING_SHOPPING_LIST';
export const SAVING_SHOPPING_LIST_SUCCESS = 'SAVING_SHOPPING_LIST_SUCCESS';
export const SAVING_SHOPPING_LIST_FAILURE = 'SAVING_SHOPPING_LIST_FAILURE';

export const DELETING_SHOPPING_LIST = 'DELETING_SHOPPING_LIST';
export const DELETING_SHOPPING_LIST_SUCCESS = 'DELETING_SHOPPING_LIST_SUCCESS';
export const DELETING_SHOPPING_LIST_FAILURE = 'DELETING_SHOPPING_LIST_FAILURE';

export const SELECT_SHOPPING_LIST = 'SELECT_SHOPPING_LIST';

export const CREATING_SHOPPING_LIST = 'CREATING_SHOPPING_LIST';
export const CANCEL_EDIT_SHOPPING_LIST = 'CANCEL_EDIT_SHOPPING_LIST';
export const EDIT_SHOPPING_LIST = 'EDIT_SHOPPING_LIST';

export const CHECK_FILTER_DONE = 'CHECK_FILTER_DONE';
export const CHECK_FILTER_MINE = 'CHECK_FILTER_MINE';

function savingShoppingList(shoppingList) {
    return {
       type: SAVING_SHOPPING_LIST,
       shoppingList
    }
 }
 
 function savingShoppingListSuccess(shoppingList) {
    return {
       type: SAVING_SHOPPING_LIST_SUCCESS,
       shoppingList
    }
 }
 
 function savingShoppingListFailure(error) {
    return {
       type: SAVING_SHOPPING_LIST_FAILURE,
       error
    }
 }

 function deletingShoppingList() {
    return {
       type: DELETING_SHOPPING_LIST
    }
 }
 
 function deletingShoppingListSuccess() {
    return {
       type: DELETING_SHOPPING_LIST_SUCCESS
    }
 }
 
 function deletingShoppingListFailure(error) {
    return {
       type: DELETING_SHOPPING_LIST_FAILURE,
       error
    }
 }

 function fetchingShoppingLists() {
    return {
       type: FETCHING_SHOPPING_LISTS
    }
 }
 
 function fetchingShoppingListsSuccess(shoppingLists) {
    return {
       type: FETCHING_SHOPPING_LISTS_SUCCESS,
       shoppingLists
    }
 }
 
 function fetchingShoppingListsFailure(error) {
    return {
       type: FETCHING_SHOPPING_LISTS_FAILURE,
       error
    }
 }

 export function creatingShoppingList(user) {
     return {
         type: CREATING_SHOPPING_LIST,
         user
     }
 }

 export function selectShoppingList(shoppingList) {
     return {
         type: SELECT_SHOPPING_LIST,
         shoppingList
     }
 }

export function cancelEdit() {
    return {
        type: CANCEL_EDIT_SHOPPING_LIST
    }
}

export function editShoppingList() {
    return {
        type: EDIT_SHOPPING_LIST
    }
}

export function checkFilterDone(checked) {
    return {
        type: CHECK_FILTER_DONE,
        checked
    }
}

export function checkFilterMine(checked) {
    return {
        type: CHECK_FILTER_MINE,
        checked
    }
}
 
export function fetchShoppingLists(auth_token) {
    return function (dispatch) {
        dispatch(fetchingShoppingLists());
        try {
            return axios.get(`${ROOT_URL}/shopping_list/`,
                { 
                    headers: {
                        'Authorization': 'Bearer ' + auth_token
                    }
                }
                )
                .then (response => { 
                    dispatch(fetchingShoppingListsSuccess(response.data.data));
                })
                .catch(error => {
                    dispatch(fetchingShoppingListsFailure(error));
                    dispatch(showToast({ text: error.response.data.message, action: 'OK'}));
                });
        }
        catch(error) {
            dispatch(fetchingShoppingListsFailure(error));
            dispatch(showToast({ text: error, action: 'OK'}));
        }
    }
}

function updateShoppingList(dispatch, auth_token, shoppingList) {
    return axios.put(`${ROOT_URL}/shopping_list/${shoppingList.id}/`, shoppingList,
        { 
            headers: {
                'Authorization': 'Bearer ' + auth_token
            }
        }
        )
        .then (response => { 
            dispatch(savingShoppingListSuccess(response.data));
            dispatch(fetchShoppingLists(auth_token));
            dispatch(showToast({ text: response.data.message, action: 'OK'}));
        })
        .catch(error => {
            dispatch(savingShoppingListFailure(error));
            dispatch(showToast({ text: error.response.data.message, action: 'OK'}));
        });
}

function createShoppingList(dispatch, auth_token, shoppingList) {
    return axios.post(`${ROOT_URL}/shopping_list/`, shoppingList,
        { 
            headers: {
                'Authorization': 'Bearer ' + auth_token
            }
        }
        )
        .then (response => { 
            dispatch(savingShoppingListSuccess(response.data));
            dispatch(fetchShoppingLists(auth_token));
            dispatch(showToast({ text: response.data.message, action: 'OK'}));
        })
        .catch(error => {
            dispatch(savingShoppingListFailure(error));
            dispatch(showToast({ text: error.response.data.message, action: 'OK'}));
        });
}

export function saveShoppingList(auth_token, shoppingList) {
    return function (dispatch) {
        dispatch(savingShoppingList());
        if(shoppingList.id) {
            updateShoppingList(dispatch, auth_token, shoppingList);
        }
        else {
            createShoppingList(dispatch, auth_token, shoppingList);
        }
    }
}


export function deleteShoppingList(auth_token, id) {
    return function (dispatch) {
        dispatch(deletingShoppingList());
        try {
            return axios.delete(`${ROOT_URL}/shopping_list/${id}/`,
                { 
                    headers: {
                        'Authorization': 'Bearer ' + auth_token
                    }
                }
                )
                .then (response => { 
                    dispatch(deletingShoppingListSuccess());
                    dispatch(fetchShoppingLists(auth_token));
                    dispatch(showToast({ text: response.data.message, action: 'OK'}));
                })
                .catch(error => {
                    dispatch(deletingShoppingListFailure(error));
                    dispatch(showToast({ text: error.response.data.message, action: 'OK'}));
                });
        }
        catch(error) {
            dispatch(deletingShoppingListFailure(error));
            dispatch(showToast({ text: error, action: 'OK'}));
        }
    }
}
