import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";

export default function GSTVerification() {
  return (
    <AuthLayout
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>GST Verification</h2>

          <p>
            Verify your business using a valid GST registration.
          </p>

          <AuthInput
            label="GST Number"
            placeholder="27ABCDE1234F1Z5"
          />

          <div className="upload-box">

            <h4>GST Certificate</h4>

            <p>
              Upload GST Registration Certificate
            </p>

            <input type="file" />

          </div>

          <Link to="/pan-verification">
            <AuthButton>
              Continue →
            </AuthButton>
          </Link>

        </>
      }

      right={
        <>
          <h2>Why GST Verification?</h2>

          <p>
            GST verification confirms that your business
            is legally registered and eligible to trade
            within Takshaya's manufacturing ecosystem.
          </p>

          <ul className="feature-list">
            <li>✓ Business Authenticity</li>
            <li>✓ Verified Company Name</li>
            <li>✓ State Verification</li>
            <li>✓ Trust Score +10</li>
          </ul>

        </>
      }
    />
  );
}