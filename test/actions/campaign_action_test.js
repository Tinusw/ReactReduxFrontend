import { expect } from "../test_helper";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

import { storageMock } from "./mock_local_storage";

import { fetchCampaigns } from "../../src/actions/index";

import { FETCH_CAMPAIGNS, AUTH_ERROR } from "../../src/actions/types";

global.localStorage = storageMock();

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

let store;
let url;

describe("CAMPAIGN ACTION CREATORS", () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    url = "http://localhost:3030";
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("returns success message and dispatches FETCH_CAMPAIGNS", () => {
    const fetchSuccess = {
      data: {
        message: "yaaaay"
      }
    };

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {
            message: "yaaaay"
          }
        }
      });
    });

    const expectedAction = { type: FETCH_CAMPAIGNS, payload: fetchSuccess };

    return store.dispatch(fetchCampaigns()).then(() => {
      const actualAction = store.getActions();
      expect(actualAction[0]).to.eql(expectedAction);
    });
  });

  it("returns error message on error and dispatches AUTH_ERROR", () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          data: "Unauthorized",
          status: 401
        }
      });
    });

    const expectedAction = {
      type: AUTH_ERROR,
      payload: "Error: Request failed with status code 401"
    };

    return store.dispatch(fetchCampaigns()).then(() => {
      const actualAction = store.getActions();
      expect(actualAction[0].type).to.eql(expectedAction.type);
      expect(actualAction[0].payload.toString()).to.eql(expectedAction.payload);
    });
  });
});
