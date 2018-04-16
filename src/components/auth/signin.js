import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      const [status, httpResponse] = [this.props.errorMessage.statusText, this.props.errorMessage.status]
      return (
        <div className="alert alert-danger">
          <strong>Error</strong>: {`${status} - ${httpResponse}`}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="Signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            name="email"
            component="input"
            type="text"
            className="form-control"
            required="true"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>password:</label>
          <Field
            name="password"
            component="input"
            type="password"
            className="form-control"
            required="true"
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: "signin"
})(connect(mapStateToProps, actions)(Signin));
