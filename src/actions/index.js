import { SUBMIT_LOGIN } from "./types";

export function signinUser({ email, password }) {
  return {
    type: SUBMIT_LOGIN,
    payload: { email, password }
  };
}
