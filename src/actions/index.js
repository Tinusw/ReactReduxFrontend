import axios from "axios";

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_CAMPAIGNS } from "./types";

const ROOT_URL = "http://localhost:";
const PORT = "3030";

export function signinUser({ email, password }) {
  return ((dispatch) => {
    return axios.post(`${ROOT_URL}${PORT}/signin`, { email, password })
      .then(response => {
        // update state to be auth'd
        dispatch({ type: AUTH_USER });
        // Save token locally
        localStorage.setItem('token', response.data.token)
      })
      .catch(error => {
        dispatch({ type: AUTH_ERROR, payload: error });
      });
  });
}

export function signUpUser({ email, password }) {
  return ((dispatch) => {
    return axios.post(`${ROOT_URL}${PORT}/signup`, { email, password })
      .then(response => {
        // update state to be auth'd
        dispatch({ type: AUTH_USER });
        // Save token locally
        localStorage.setItem('token', response.data.token)
      })
      .catch(error => {
        dispatch({ type: AUTH_ERROR, payload: error });
      });
  });
}

export function signoutUser() {
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

export function fetchCampaigns() {
  return ((dispatch) => {
    return axios.get(`${ROOT_URL}${PORT}/campaign/index`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log(response.data)
        dispatch({ type: FETCH_CAMPAIGNS, payload: response.data})
      })
      .catch(error => {
        dispatch({ type: AUTH_ERROR, payload: error})
      });
  });
}
