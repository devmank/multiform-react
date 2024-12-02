import "./index.css";

import MultiStepForm from "./multistepForm.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MultiStepForm />
  </StrictMode>
);
