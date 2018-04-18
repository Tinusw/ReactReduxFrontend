import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";
import { renderField } from "../form/field";

// Passed down to our field component to set required="true"
const required = value => (value ? undefined : "Required");

class SignUp extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.authenticated == true) {
      this.props.history.push("/campaign/index");
    }
    return true;
  }

  handleFormSubmit({ email, password }) {
    this.props.signUpUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      const [status, httpResponse] = [
        this.props.errorMessage.data.error,
        this.props.errorMessage.status
      ];
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
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          component={renderField}
          type="email"
          validate={[required]}
          label="Email"
        />
        <Field
          name="password"
          component={renderField}
          type="password"
          label="Password"
          validate={[required]}
        />
        <Field
          name="password_confirmation"
          component={renderField}
          type="password"
          label="Password Confirmation"
          validate={[required]}
        />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    );
  }
}

function validate(values) {
  let errors = {};

  if (values.password != values.password_confirmation) {
    errors.password = "Password and password confirmation don't match!";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: "SignUp",
    validate
  })(SignUp)
);
