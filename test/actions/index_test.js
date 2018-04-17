import { expect } from "../test_helper";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios';

import { AUTH_USER } from "../../src/actions/types";

import { signinUser } from "../../src/actions/index";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
let url;

describe('AUTH ACTION', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    url = "http://localhost:3030";
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('create a token on AUTH USER', (done) => {
    moxios.stubRequest(url, {
      status: 200,
      response: {
        data: {
          token: 'sample_token'
        }
      },
    });

    const expectedAction = { type: AUTH_USER }

    let testData = { email: "test1@test.com", password: "1234"}
    store.dispatch(signinUser(testData)).then(() => {
      const actualAction = store.getActions()
      expect(actualAction).to.eql(expectedAction)
    })
  })
})



// describe('All actions', function description() {
//   beforeEach("fake server", () => moxios.install());
//   afterEach("fake server", () => moxios.uninstall());

//   it("should return an action to get All Analysis", (done) => {
//     // GIVEN
//     const disptach = sinon.spy();
//     const expectedAction = { type: AUTH_USER };
//     const expectedUrl = "http://localhost:3000";
//     moxios.stubRequest(expectedUrl, { status: 200, response: "dummyResponse" });

//     // WHEN
//     let testData = { email: "test1@test.com", password: "1234"}
//     signinUser(dispatch)(testData);

//     // THEN
//     moxios.wait(() => {
//         sinon.assert.calledWith(dispatch, {
//             type: AUTH_USER,
//             payload: "dummyResponse"
//         });
//         done();
//     });
//   });
// });



// const mockStore = configureStore([thunk])

// describe('auth actions', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });



//   it("should return an access token", (done) => {
//     const disptach = sinon.spy();
//     moxios.stubRequest("http://localhost:3030", {
//       status: 200,
//       response: {
//         data: {
//           token: "test"
//         }
//       }
//     })

//     let valid_data = { email: 'test1@test.com', password: '1234' }
//     signinUser(dispatch)(valid_data)

//     moxios.wait(() => {
//       expect(signinUser).to.have.been.called.with(valid_data)
//     })
//   })
// })
