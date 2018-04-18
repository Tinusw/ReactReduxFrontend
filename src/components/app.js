import React, { Component } from "react";
import { Route } from "react-router-dom";

import Header from "./header";
import Signin from "./auth/signin";
import Signout from './auth/signout';
import Signup from './auth/signup';
import CampaignIndex from './campaign/campaign_index'
import RequireAuth from './auth/require_auth'
import Root from './root'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route path={"/"} component={Root}/>
        <Route path={"/signin"} component={Signin}/>
        <Route path={"/signout"} component={Signout}/>
        <Route path={"/signup"} component={Signup}/>
        <Route path={"/campaign/index"} component={RequireAuth(CampaignIndex)}/>
      </div>
    );
  }
}
