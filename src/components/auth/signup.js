import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions'
import { renderField } from '../form/field'

const required = value => (value ? undefined : 'Required')

class SignUp extends Component {

  handleFormSubmit({email, password }) {
    this.props.signUpUser({ email, password })
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
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(values) {
  let errors = {}

  if (values.password != values.password_confirmation) {
    errors.password = 'Password and password confirmation don\'t match!'
  }

  return errors
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(reduxForm({
  form:'SignUp',
  validate
})(SignUp));
