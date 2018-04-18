import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";

class Signup extends Component {
  render() {
    const { handleSubmit } = this.props;
    console.log(this.props)
    return (
      <form onSubmit={handleSubmit}>
        <fieldset className="form-group">
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" className="form-control"/>

          <label htmlFor="password">password</label>
          <Field name="password" component="input" type="password" className="form-control"/>
          <label htmlFor="passwordConfirm">passwordConfirm</label>
          <Field name="passwordConfirm" component="input" type="password" className="form-control"/>
        </fieldset>
        <button action="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    );
  }
}

// function validate(formProps) {
//   const errors = {};
//   if (formProps.password !== formProps.passwordConfirm) {
//     errors.password = "Passwords must match";
//   }
//   console.log("pew");
//   return errors;
// }

const validate = values => {
  const errors = {}
  if (values.password !== values.passwordConfirm) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

Signup = reduxForm({
  form: "signup",
  validate
})(Signup);

export default Signup;
