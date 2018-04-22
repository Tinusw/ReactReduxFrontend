import { expect } from "../test_helper";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

import { storageMock } from "./mock_local_storage";

import { signinUser, signoutUser, signUpUser } from "../../src/actions/index";

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from "../../src/actions/types";

global.localStorage = storageMock();

// Fake success response
const AuthSuccess = {
  data: {
    token: "1234"
  }
};

// Fake failure response
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

describe("AUTH ACTION CREATORS", () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    url = "http://localhost:3030";
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("signinUser()", () => {
    it("create a token on AUTH USER", () => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: {
            data: {
              token: "sample_token"
            }
          }
        })
      })
      const expectedAction = { type: AUTH_USER };
      let testData = { email: "test1@test.com", password: "1234" };
      return store.dispatch(signinUser(testData)).then(() => {
        const actualAction = store.getActions();
        expect(actualAction[0]).to.eql(expectedAction);
      });
    });

    it("returns an error on AUTH_ERROR with 401", () => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 401,
          response: {
            data: "Unauthorized",
            status: 401
          }
        })
      })

      const expectedAction = { type: AUTH_ERROR, payload: "Error: Request failed with status code 401" };

      let testData = { email: "test1@test.com", password: "124" };
      return store.dispatch(signinUser(testData)).then(() => {
        const actualAction = store.getActions();
        expect(actualAction[0].type).to.eql(expectedAction.type);
        expect(actualAction[0].payload.toString()).to.eql(expectedAction.payload);
      });
    });
  });

  describe("signUpUser()", () => {
    it("create a token on AUTH USER", () => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 201,
          response: {
            data: {
              token: "sample_token"
            }
          }
        })
      })

      const expectedAction = { type: AUTH_USER };

      let testData = { email: "test1@test.com", password: "1234" };
      return store.dispatch(signUpUser(testData)).then(() => {
        const actualAction = store.getActions();
        expect(actualAction[0]).to.eql(expectedAction);
      });
    });

    it("returns an error on AUTH_ERROR with 401", () => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 401,
          response: {
            data: "Unauthorized",
            status: 401
          }
        })
      })

      const expectedAction = { type: AUTH_ERROR, payload: "Error: Request failed with status code 401" };

      let testData = { email: "test1@test.com", password: "124" };
      return store.dispatch(signinUser(testData)).then(() => {
        const actualAction = store.getActions();
        expect(actualAction[0].type).to.eql(expectedAction.type);
        expect(actualAction[0].payload.toString()).to.eql(expectedAction.payload);
      });
    });

    describe("if email is in use", () => {
      it("returns an error on AUTH_ERROR with 422", () => {
        moxios.wait(() => {
          let request = moxios.requests.mostRecent()
          request.respondWith({
            status: 422,
            response: {
              data: "Email is in use",
              status: 422
            }
          })
        })

        const expectedAction = { type: AUTH_ERROR, payload: 'Error: Request failed with status code 422' };

        let testData = { email: "test1@test.com", password: "124" };
        return store.dispatch(signinUser(testData)).then(() => {
          const actualAction = store.getActions();
          expect(actualAction[0].type).to.eql(expectedAction.type);
          expect(actualAction[0].payload.toString()).to.eql(expectedAction.payload);
        });
      });
    });
  });

  describe("signoutUser()", () => {
    it("returns authenticated false on UNAUTH_USER", () => {
      beforeEach(() => {
        localStorage.setItem("token", "test");
      });

      const expectedAction = { type: UNAUTH_USER };
      const actualAction = store.getActions();
      expect(signoutUser()).to.eql(expectedAction);
    });
  });
});

