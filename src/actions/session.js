import axios from 'axios';
import {ROOT_URL} from './index';
import { showToast } from './ui';

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGING_IN_SUCCESS = 'LOGGING_IN_SUCCES';
export const LOGGING_IN_FAILURE = 'LOGGING_IN_FAILURE';

export const REGISTERING = 'REGISTERING';
export const REGISTERING_SUCCESS = 'REGISTERING_SUCCESS';
export const REGISTERING_FAILURE = 'REGISTERING_FAILURE';

export const LOGGING_OUT = 'LOGGING_OUT';
export const LOGGING_OUT_SUCCESS = 'LOGGING_OUT_SUCCES';
export const LOGGING_OUT_FAILURE = 'LOGGING_OUT_FAILURE';

function loggingOut(username, account) {
   return {
      type: LOGGING_OUT
   }
}

function loggingOutSuccess(session) {
   return {
      type: LOGGING_OUT_SUCCESS,
      session
   }
}

function loggingOutFailure(error) {
   return {
      type: LOGGING_OUT_FAILURE,
      error
   }
}

function loggingIn(username, account) {
    return {
       type: LOGGING_IN,
       username,
       account
    }
 }
 
 function loggingInSuccess(session) {
    return {
       type: LOGGING_IN_SUCCESS,
       session
    }
 }
 
 function loggingInFailure(error) {
    return {
       type: LOGGING_IN_FAILURE,
       error
    }
 }

function registering(username, account) {
   return {
      type: REGISTERING,
      username, 
      account
   }
}

function registeringSuccess(session) {
   return {
      type: REGISTERING_SUCCESS,
      session
   }
}

function registeringFailure(error) {
   return {
      type: REGISTERING_FAILURE,
      error
   }
}

export function logIn(data) {
   return function (dispatch) {
        const { username, account_name, email, password } = data;
        dispatch(loggingIn(username, account_name));
        return axios.post(`${ROOT_URL}/user/login/`, { username, email, password, account_name })
               .then (response => {
                  dispatch(loggingInSuccess(response.data));
               })
               .catch(error => {
                  dispatch(loggingInFailure(error));
                  dispatch(showToast({ text: error.response.data.message, action: 'OK'}));
               });
   }
}

export function register(data) {
    return function (dispatch) {
        const { username, account_name, email, name, password } = data;
        dispatch(registering(username, account_name));
        try {
            return axios.post(`${ROOT_URL}/user/register/`, 
                    { 
                        username, 
                        password, 
                        email,
                        name,
                        account_name
                    }
                )
                .then (response => {
                    dispatch(registeringSuccess(response.data));
                })
                .catch(error => {
                    dispatch(registeringFailure(error));
                    dispatch(showToast({ text: error.response.data.message, action: 'OK'}));
                });
        }
        catch(error) {
            dispatch(registeringFailure(error));
        }
    }
}

export function logOut(auth_token) {
    return function (dispatch) {
        dispatch(loggingOut(auth_token));
        try {
            return axios.post(`${ROOT_URL}/user/logout/`, {},
                { 
                    headers: {
                        'Authorization': 'Bearer ' + auth_token
                    }
                }
                )
                .then (response => { 
                    dispatch(loggingOutSuccess(response.data));
                })
                .catch(error => {
                    dispatch(loggingOutFailure(error));
                });
        }
        catch(error) {
            dispatch(registeringFailure(error));
        }
    }
}