import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, browserHistory } from "react-router-dom";

import App from "./components/app";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter history={browserHistory}>
      <Route path="/" component={App}></Route>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
