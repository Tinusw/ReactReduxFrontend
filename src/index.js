import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, browserHistory } from "react-router-dom";
import reduxThunk from 'redux-thunk'

import App from "./components/app";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter history={browserHistory}>
      <Route path="/" component={App}/>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
