import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux"
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password})
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            name="email"
            component="input"
            type="text"
            className="form-control"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>password:</label>
          <Field
            name="password"
            component="input"
            type="text"
            className="form-control"
          />
        </fieldset>
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: "signin"
})(connect(null, actions)(Signin));
