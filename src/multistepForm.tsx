import { FormProvider } from "./context/FormContext.tsx";
import ProgressBar from "./progressBar.tsx";
import Step1 from "./step1.tsx";
import Step2 from "./step2.tsx";
import Step3 from "./step3.tsx";
import Summary from "./summary.tsx";
import { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const goToStep = (stepNumber: number) => setStep(stepNumber);
  const handleSubmit = () => {
    alert("Form Submitted Successfully!");
  };

  return (
    <FormProvider>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        {/* Progress bar */}
        <ProgressBar currentStep={step} />

        {/* Steps */}
        {step === 1 && <Step1 nextStep={nextStep} />}
        {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <Step3 nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <Summary goToStep={goToStep} onSubmit={handleSubmit} />}
      </div>
    </FormProvider>
  );
};

export default MultiStepForm;
