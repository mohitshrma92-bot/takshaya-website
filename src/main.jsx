import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import "./auth-qa.css";

import App from "./App";
import { OnboardingProvider } from "./context/OnboardingContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <OnboardingProvider>
        <App />
      </OnboardingProvider>
    </AuthProvider>
  </StrictMode>
);