import React from "react";
import { Field } from "formik";

export const FormField = ({
  formField,
  values,
  errors,
  handleChange,
  touched,
}) => {
  const { fieldLabel, name, type } = formField;
  return (
    <div className="row mb-3">
      <label className="col-sm-3 col-form-label d-flex justify-content-start">
        {fieldLabel}:
      </label>
      <div className="col-sm-8">
        <Field
          type={type}
          id={name}
          name={name}
          className={`form-control ${
            touched[name] && errors[name] && "border-danger"
          }`}
          value={values[name]}
          onChange={handleChange}
        />
        <div className="text-danger d-flex justify-content-start">
          {touched[name] && errors[name] && errors[name]}
        </div>
      </div>
    </div>
  );
};
