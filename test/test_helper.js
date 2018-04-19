import _$ from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import { JSDOM } from 'jsdom';
import chai, { expect } from "chai";
import chaiJquery from "chai-jquery";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../src/reducers";
import { Route, Link } from "react-router-dom";
import MockRouter from 'react-mock-router';

const { window } = new JSDOM("<!doctype html><html><body></body></html>");

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js"
};

const $ = _$(window);

chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, state = {}) {

  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <MockRouter location={props.location}>
        <ComponentClass {...props}/>
      </MockRouter>
    </Provider>
  );

  console.log(componentInstance)

  return $(ReactDOM.render(componentInstance));
}

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export { renderComponent, expect };
