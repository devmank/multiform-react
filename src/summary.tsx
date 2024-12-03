import FormContext from "./context/FormContext.tsx";
import { useContext } from "react";

const Summary = ({
  goToStep,
  onSubmit,
}: {
  goToStep: (stepNumber: number) => void;
  onSubmit: () => void;
}) => {
  const { state } = useContext(FormContext);

  const handleEdit = (step: number) => {
    goToStep(step);
  };

  return (
    <div className="form-container">
      <h2>Summary</h2>
      <div className="summary-section">
        <section>
          <h3>Personal Information</h3>
          <p>
            <strong>First Name:</strong> {state.personalInfo.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {state.personalInfo.lastName}
          </p>
          <p>
            <strong>Email:</strong> {state.personalInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {state.personalInfo.phone || "N/A"}
          </p>
          <button onClick={() => handleEdit(1)} className="btn btn-secondary">
            Edit
          </button>
        </section>

        <section>
          <h3>Location</h3>
          <p>
            <strong>Country:</strong> {state.location.country}
          </p>
          <p>
            <strong>City:</strong> {state.location.city}
          </p>
          <button onClick={() => handleEdit(2)} className="btn btn-secondary">
            Edit
          </button>
        </section>

        <section>
          <h3>Payment Information</h3>
          <p>
            <strong>Card Number:</strong> **** **** ****{" "}
            {state.paymentInfo.cardNumber.slice(-4)}
          </p>
          <p>
            <strong>Expiry Date:</strong> {state.paymentInfo.expiryDate}
          </p>
          <p>
            <strong>Billing Address:</strong> {state.paymentInfo.billingAddress}
          </p>
          <button onClick={() => handleEdit(3)} className="btn btn-secondary">
            Edit
          </button>
        </section>
      </div>

      <div className="form-actions">
        <button onClick={() => goToStep(3)} className="btn btn-secondary">
          Back
        </button>
        <button onClick={onSubmit} className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Summary;
