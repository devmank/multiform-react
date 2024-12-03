const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const totalSteps = 4; // Total number of steps in your form
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div style={{ marginBottom: "0px" }}>
      <div
        style={{
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
          //   overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "10px",
            width: `${progress}%`,
            backgroundColor: "#4caf50",
          }}
        ></div>
      </div>
      <div style={{ textAlign: "center", marginTop: "5px" }}>
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default ProgressBar;
