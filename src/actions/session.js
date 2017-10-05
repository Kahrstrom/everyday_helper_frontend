import axios from 'axios';
import {ROOT_URL} from './index';

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGING_IN_SUCCESS = 'LOGGING_IN_SUCCES';
export const LOGGING_IN_FAILURE = 'LOGGING_IN_FAILURE';

export const REGISTERING = 'REGISTERING';
export const REGISTERING_SUCCESS = 'REGISTERING_SUCCESS';
export const REGISTERING_FAILURE = 'REGISTERING_FAILURE';

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

function registeringFailure(session) {
   return {
      type: REGISTERING_FAILURE,
      session
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
      console.log(data);
      const { username, account, email, firstname, lastname, password } = data;
      dispatch(registering(username, account));
      return axios.post(`${ROOT_URL}user/register/`, { username, password, account })
               .then (response => {
                  console.log(response);
                  dispatch(registeringSuccess(response.data));
               })
               .catch(error => {
                  dispatch(registeringFailure(error));
               });
   }
}