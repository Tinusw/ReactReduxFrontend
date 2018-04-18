import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { renderField } from '../form/field'

// Passed down to field component to enable require="true"
const required = value => (value ? undefined : 'Required')

class Signin extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.authenticated == true) {
      this.props.history.push("/feature");
    }
    return true;
  }

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      const [status, httpResponse] = [
        this.props.errorMessage.data.error || this.props.errorMessage.statusText,
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
      <form
        className="Signin"
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      >
        <fieldset className="form-group">
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
            validate={[required]}
            label="password"
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
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated
  };
}

export default reduxForm({
  form: "signin"
})(connect(mapStateToProps, actions)(Signin));
