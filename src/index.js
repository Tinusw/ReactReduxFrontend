import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Route } from "react-router-dom";
import { AUTH_USER } from "./actions/types";

import reduxThunk from 'redux-thunk'

import App from "./components/app";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const reduxDevToolsStore = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStoreWithMiddleware(reducers, reduxDevToolsStore)

// If token found set state to authenticated
const token = localStorage.getItem('token')

if (token) {
  store.dispatch({ type: AUTH_USER})
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App}/>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
