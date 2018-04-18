// Used in our redux-forms
// Nice little field component that can render validation errors

import React, { Component } from 'react'

export const renderField = ({ input, label, type, required, meta: { touched, error, warning } }) => (
  <fieldset className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <input className="form-control" {...input} type={type}/>
    { touched && error && <span className="text-danger">{error}</span> }
  </fieldset>
)
