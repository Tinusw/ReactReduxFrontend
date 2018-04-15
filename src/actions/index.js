import axios from 'axios'
import { browserHistory } from 'react-router'
import history from '../modules/history'

import { SUBMIT_LOGIN } from "./types";

const ROOT_URL = "http://localhost:";
const PORT = "3030";

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}${PORT}/signin`, { email, password })
      .then(response => {
        // return {
        //   type: SUBMIT_LOGIN,
        //   payload: response
        // }
        history.push('/feature')
      })
      .catch((error) => {
        console.log(error)
      })
  };
}
