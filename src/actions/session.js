import axios from 'axios';
import {ROOT_URL} from './index';

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

export function logIn(username, password, account) {
   return function (dispatch) {
      dispatch(loggingIn(username, account));
      return axios.post(`${ROOT_URL}user/login/`, { username, password, account })
               .then (response => {
                   
                  dispatch(loggingInSuccess(response.data));
               })
               .catch(error => {
                  dispatch(loggingInFailure(error));
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
                    console.log(response);
                    dispatch(registeringSuccess(response.data));
                })
                .catch(error => {
                    dispatch(registeringFailure(error));
                });
        }
        catch(error) {
            dispatch(registeringFailure(error));
        }
    }
}

export function logout(auth_token) {
    return function (dispatch) {
        dispatch(loggingOut(auth_token));
        try {
            return axios.post(`${ROOT_URL}/user/register/`, 
                { 
                    headers: {
                        'Bearer':auth_token
                    }
                }
                )
                .then (response => {
                    console.log(response);
                    dispatch(registeringSuccess(response.data));
                })
                .catch(error => {
                    dispatch(registeringFailure(error));
                });
        }
        catch(error) {
            dispatch(registeringFailure(error));
        }
    }
}