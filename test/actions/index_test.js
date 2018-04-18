import { expect } from "../test_helper";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

import { storageMock } from "./mock_local_storage";

import { signinUser, signoutUser } from "../../src/actions/index";
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from "../../src/actions/types";

global.localStorage = storageMock();

// Fake success response
const AuthSuccess = {
  data: {
    token: "1234"
  }
};

// Fake success response
const AuthFailure = {
  response: {
    data: "Unauthorized",
    status: 401
  }
};

// Fake Data
const data = {
  email: "test@test1.com",
  password: "1234"
};

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

let store;
let url;

describe("AUTH ACTION", () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    url = "http://localhost:3030";
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("create a token on AUTH USER", done => {
    moxios.stubRequest(url, {
      status: 200,
      response: {
        data: {
          token: "sample_token"
        }
      }
    });

    const expectedAction = { type: AUTH_USER };

    let testData = { email: "test1@test.com", password: "1234" };
    store.dispatch(signinUser(testData)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).to.eql(expectedAction);
    });
    done();
  });

  it("returns an error on AUTH_ERROR", done => {
    moxios.stubRequest(url, {
      status: 401,
      response: {
        data: "Unauthorized",
        status: 401
      }
    });

    const expectedAction = { type: AUTH_ERROR, payload: AuthFailure };

    let testData = { email: "test1@test.com", password: "124" };
    store.dispatch(signinUser(testData)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).to.eql(expectedAction);
    });
    done();
  });

  it("returns authenticated false on UNAUTH_USER", () => {
    beforeEach(() => {
      localStorage.setItem("token", "test");
    });

    const expectedAction = { type: UNAUTH_USER };
    const actualAction = store.getActions();
    expect(signoutUser()).to.eql(expectedAction);
  });
});
