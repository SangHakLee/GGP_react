import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
} from './ActionTypes';

import axios from 'axios';

/*============================================================================
    authentication
==============================================================================*/

/* LOGIN */
export function loginRequest(username, password) {
    /* To be implemented */
    return (dispatch) => {
      dispatch(login());

      // API 요청
      return axios.post('/api/account/signin', {username, password})
      .then((response) => {
          // 성공
          dispatch(loginSuccess(username));
      }).catch((error) => {
        dispatch(loginFailure());
      });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}
