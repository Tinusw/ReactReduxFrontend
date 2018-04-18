import { expect } from "../test_helper";
import reducer from '../../src/reducers/auth_reducer'
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from "../../src/actions/types";

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({})
  })

  it('should handle AUTH_USER', () => {
    expect(
      reducer({}, {
        type: AUTH_USER
      })
    ).to.eql({
      authenticated: true,
      error: ''
    })
  })

  it('should handle UNAUTH_USER', () => {
    expect(
      reducer({}, {
        type: UNAUTH_USER
      })
    ).to.eql({
      authenticated: false
    })
  })

  it('should handle AUTH_ERROR', () => {
    let error = {
      response: {
        data: "Unauthorized",
        status: 401,
        statusText: "Unauthorized"
      }
    }

    let reducerErrorText = {
      data: "Unauthorized",
      status: 401,
      statusText: "Unauthorized"
    }

    expect(
      reducer({}, {
        type: AUTH_ERROR,
        payload: error
      })
    ).to.eql({error: {"data": "Unauthorized", status: 401, statusText: "Unauthorized"}})
  })
})
