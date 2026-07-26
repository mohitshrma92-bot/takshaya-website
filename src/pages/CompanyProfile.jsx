import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

export default function CompanyProfile() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>Company Profile</h2>

          <p>
            Tell us about your business so we can personalize your Takshaya experience.
          </p>

          <AuthInput
            label="Company Name"
            placeholder="ABC Engineering Pvt. Ltd."
          />

          <AuthInput
            label="Legal Company Name"
            placeholder="ABC Engineering Private Limited"
          />

          <AuthInput
            label="Company Website"
            placeholder="https://www.company.com"
          />

          <AuthInput
            label="Industry"
            placeholder="Automotive, Packaging, Medical..."
          />

          <AuthButton
            onClick={() => navigate("/business-roles")}
          >
            Continue →
          </AuthButton>
          <div className="auth-back">
           <button
            type="button"
            onClick={() => navigate("/verify-email")}
            className="text-button"
           >
            ← Back
           </button>
          </div>
        </>
      }

      right={
        <div className="auth-right-content">
          <h1>Company Profile</h1>

          <p>
            Complete your company information before continuing to business verification.
          </p>
        </div>
      }
    />
  );
}