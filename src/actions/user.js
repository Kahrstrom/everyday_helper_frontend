import axios from 'axios';
import {ROOT_URL} from './index';

export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCHING_USERS_SUCCESS = 'FETCHING_USERS_SUCCESS';
export const FETCHING_USERS_FAILURE = 'FETCHING_USERS_FAILURE';


function fetchingUsers() {
    return {
       type: FETCHING_USERS
    }
 }
 
 function fetchingUsersSuccess(users) {
    return {
       type: FETCHING_USERS_SUCCESS,
       users
    }
 }
 
 function fetchingUsersFailure(error) {
    return {
       type: FETCHING_USERS_FAILURE,
       error
    }
 }


export function fetchUsers(auth_token) {
    return function (dispatch) {
        dispatch(fetchingUsers());
        try {
            return axios.get(`${ROOT_URL}/users/`,
                { 
                    headers: {
                        'Authorization': 'Bearer ' + auth_token
                    }
                }
                )
                .then (response => { 
                    dispatch(fetchingUsersSuccess(response.data.data));
                })
                .catch(error => {
                    dispatch(fetchingUsersFailure(error));
                });
        }
        catch(error) {
            dispatch(fetchingUsersFailure(error));
        }
    }
}