import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

export default function FactoryAddress() {
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

          <h2>Factory & Office Address</h2>

          <p>
            Help buyers know where your manufacturing operations are located.
          </p>

          <AuthInput
            label="Registered Office Address"
            placeholder="Enter Registered Office Address"
          />

          <AuthInput
            label="Factory Address"
            placeholder="Enter Factory Address"
          />

          <AuthInput
            label="City"
            placeholder="Mumbai"
          />

          <AuthInput
            label="State"
            placeholder="Maharashtra"
          />

          <AuthInput
            label="PIN Code"
            placeholder="400001"
          />

          <div className="button-group">

            <AuthButton
              variant="secondary"
              onClick={() => navigate("/udyam-verification")}
            >
              ← Back
            </AuthButton>

            <AuthButton
              onClick={() => navigate("/authorized-person")}
            >
              Continue →
            </AuthButton>

          </div>
        </>
      }

      right={
        <div className="auth-right-content">

          <h1>Location Matters</h1>

          <p>
            Your verified manufacturing location increases buyer confidence
            and helps customers find suppliers nearby.
          </p>

          <ul className="feature-list">
            <li>✓ Verified Factory Address</li>
            <li>✓ Better Search Ranking</li>
            <li>✓ Local Buyer Visibility</li>
            <li>✓ Trust Score +15</li>
          </ul>

        </div>
      }
    />
  );
}