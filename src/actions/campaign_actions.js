import axios from "axios";

import { FETCH_CAMPAIGNS, AUTH_ERROR } from "./types";

const ROOT_URL = "http://localhost:";
const PORT = "3030";

export function fetchCampaigns() {
  return ((dispatch) => {
    return axios.get(`${ROOT_URL}${PORT}/campaign/index`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({ type: FETCH_CAMPAIGNS, payload: response.data})
      })
      .catch(error => {
        dispatch({ type: AUTH_ERROR, payload: error})
      });
  });
}
