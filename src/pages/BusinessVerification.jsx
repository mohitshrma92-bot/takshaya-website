import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

export default function BusinessVerification() {
  return (
    <AuthLayout
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>Business Verification</h2>

          <p>
            Complete your company verification to unlock the
            Takshaya Manufacturing Exchange.
          </p>

          <div className="verification-progress">

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

            <span>15% Completed</span>

          </div>

          <div className="verification-list">

            <div className="verify-item completed">
              ✓ Email Verified
            </div>

            <div className="verify-item">
              GST Verification
            </div>

            <div className="verify-item">
              PAN Verification
            </div>

            <div className="verify-item">
              UDYAM Registration
            </div>

            <div className="verify-item">
              Factory Address
            </div>

            <div className="verify-item">
              Authorized Person
            </div>

          </div>

          <Link to="/gst-verification">
            <AuthButton>
              Continue →
            </AuthButton>
          </Link>
        </>
      }

      right={
        <>
          <h2>Trusted Manufacturing Network</h2>

          <p>
            Every verified company undergoes identity and
            business verification before entering Takshaya.

            This protects both manufacturers and tooling
            owners from fraud and builds trust across the
            ecosystem.
          </p>

          <ul className="feature-list">

            <li>✓ Verified Companies</li>

            <li>✓ Verified Tool Rooms</li>

            <li>✓ Verified Manufacturing Partners</li>

            <li>✓ Secure Transactions</li>

          </ul>

        </>
      }
    />
  );
}