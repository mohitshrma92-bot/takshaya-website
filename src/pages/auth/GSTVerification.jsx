import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";

export default function GSTVerification() {
  const navigate = useNavigate();

  return (
    <OnboardingLayout
      step={4}
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>GST Verification</h2>

          <p>
            Enter your GSTIN to verify your registered business.
          </p>

          <AuthInput
            label="GST Number"
            placeholder="27ABCDE1234F1Z5"
          />

          <AuthButton
            onClick={() => navigate("/pan-verification")}
          >
            Verify GST →
          </AuthButton>

          <div className="auth-back">
            <button
              className="text-button"
              onClick={() => navigate("/business-roles")}
            >
              ← Back
            </button>
          </div>
        </>
      }
    />
  );
}