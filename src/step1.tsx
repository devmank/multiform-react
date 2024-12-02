import "./formStyles.css";

import * as Yup from "yup";

import React, { useContext } from "react";

import FormContext from "./context/formContext";
import { useFormik } from "formik";

const Step1 = ({ nextStep }: { nextStep: () => void }) => {
  const { state, dispatch } = useContext(FormContext);

  const formik = useFormik({
    initialValues: {
      firstName: state.personalInfo?.firstName || "",
      lastName: state.personalInfo?.lastName || "",
      email: state.personalInfo?.email || "",
      phone: state.personalInfo?.phone || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().matches(/^\+?\d{10,15}$/, "Invalid phone number"),
    }),
    onSubmit: (values) => {
      dispatch({ type: "UPDATE_PERSONAL_INFO", payload: values });
      nextStep();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <div className="form-group">
        <label>First Name</label>
        <input type="text" {...formik.getFieldProps("firstName")} />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="error">{formik.errors.firstName}</div>
        )}
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input type="text" {...formik.getFieldProps("lastName")} />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="error">{formik.errors.lastName}</div>
        )}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}
      </div>

      <div className="form-group">
        <label>Phone (Optional)</label>
        <input type="text" {...formik.getFieldProps("phone")} />
        {formik.touched.phone && formik.errors.phone && (
          <div className="error">{formik.errors.phone}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Next
      </button>
    </form>
  );
};

export default Step1;
