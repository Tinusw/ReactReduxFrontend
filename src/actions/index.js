import axios from "axios";
import history from "../modules/history";

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from "./types";

const ROOT_URL = "http://localhost:";
const PORT = "3030";

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}${PORT}/signin`, { email, password })
      .then(response => {
        // update state to be auth'd
        dispatch({ type: AUTH_USER });
        // Save token locally
        localStorage.setItem('token', response.data.token)
        // redirect programatically
        history.push("/feature");
      })
      .catch(error => {
        dispatch(authError(error.response));
      });
  };
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
