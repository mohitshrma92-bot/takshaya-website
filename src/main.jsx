import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import "./auth-qa.css";

import App from "./App";
import { OnboardingProvider } from "./context/OnboardingContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <OnboardingProvider>
      <App />
    </OnboardingProvider>
  </StrictMode>
);