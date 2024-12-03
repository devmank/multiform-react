import "./formStyles.css";

import * as Yup from "yup";

import FormContext from "./context/FormContext.tsx";
import { useContext } from "react";
import { useFormik } from "formik";

const Step3 = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const { state, dispatch } = useContext(FormContext);

  const formik = useFormik({
    initialValues: {
      cardNumber: state.paymentInfo?.cardNumber || "",
      expiryDate: state.paymentInfo?.expiryDate || "",
      cvv: state.paymentInfo?.cvv || "",
      billingAddress: state.paymentInfo?.billingAddress || "",
    },

    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .matches(/^\d{16}$/, "Card number must be 16 digits")
        .required("Card number is required"),
      expiryDate: Yup.string()
        .matches(
          /^(0[1-9]|1[0-2])\/\d{2}$/,
          "Expiry date must be in MM/YY format"
        )
        .required("Expiry date is required"),
      cvv: Yup.string()
        .matches(/^\d{3}$/, "CVV must be 3 digits")
        .required("CVV is required"),
      billingAddress: Yup.string().required("Billing address is required"),
    }),
    onSubmit: (values) => {
      dispatch({ type: "UPDATE_PAYMENT_INFO", payload: values });
      nextStep();
    },
  });

  return (
    <div className="form-container">
      <h2>Step 3: Payment Information</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Credit Card Number */}
        <div className="form-group">
          <label htmlFor="cardNumber">Credit Card Number</label>
          <input
            type="text"
            id="cardNumber"
            maxLength={16}
            className={`form-control ${
              formik.touched.cardNumber && formik.errors.cardNumber
                ? "error"
                : ""
            }`}
            {...formik.getFieldProps("cardNumber")}
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <div className="error-text">{formik.errors.cardNumber}</div>
          )}
        </div>

        {/* Expiry Date */}
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
          <input
            type="text"
            id="expiryDate"
            className={`form-control ${
              formik.touched.expiryDate && formik.errors.expiryDate
                ? "error"
                : ""
            }`}
            {...formik.getFieldProps("expiryDate")}
          />
          {formik.touched.expiryDate && formik.errors.expiryDate && (
            <div className="error-text">{formik.errors.expiryDate}</div>
          )}
        </div>

        {/* CVV */}
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            maxLength={3}
            className={`form-control ${
              formik.touched.cvv && formik.errors.cvv ? "error" : ""
            }`}
            {...formik.getFieldProps("cvv")}
          />
          {formik.touched.cvv && formik.errors.cvv && (
            <div className="error-text">{formik.errors.cvv}</div>
          )}
        </div>

        {/* Billing Address */}
        <div className="form-group">
          <label htmlFor="billingAddress">Billing Address</label>
          <textarea
            id="billingAddress"
            className={`form-control ${
              formik.touched.billingAddress && formik.errors.billingAddress
                ? "error"
                : ""
            }`}
            {...formik.getFieldProps("billingAddress")}
          />
          {formik.touched.billingAddress && formik.errors.billingAddress && (
            <div className="error-text">{formik.errors.billingAddress}</div>
          )}
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={prevStep}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
