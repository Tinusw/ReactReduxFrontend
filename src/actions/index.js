import axios from 'axios'

import { SUBMIT_LOGIN } from "./types";

const ROOT_URL = "http://localhost:";
const PORT = "3030";

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}${PORT}/signin`, { email, password })
  };
}
