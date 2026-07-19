import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

export default function ReviewSubmit() {
  return (
    <AuthLayout
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>Review Your Information</h2>

          <p>
            Please verify your company details before submitting them for verification.
          </p>

          <div className="review-card">

            <h3>Company Information</h3>

            <div className="review-row">
              <span>Company</span>
              <strong>ABC Engineering Pvt Ltd</strong>
            </div>

            <div className="review-row">
              <span>GST</span>
              <strong>27ABCDE1234F1Z5</strong>
            </div>

            <div className="review-row">
              <span>PAN</span>
              <strong>ABCDE1234F</strong>
            </div>

            <div className="review-row">
              <span>UDYAM</span>
              <strong>UDYAM-MH-00-0000000</strong>
            </div>

            <div className="review-row">
              <span>Business Roles</span>
              <strong>Manufacturer, Tool Owner</strong>
            </div>

            <div className="review-row">
              <span>Factory</span>
              <strong>Mumbai, Maharashtra</strong>
            </div>

            <div className="review-row">
              <span>Representative</span>
              <strong>John Sharma</strong>
            </div>

          </div>

          <div className="checkbox-group">

            <label>
              <input type="checkbox" />
              I confirm all information provided is correct.
            </label>

            <label>
              <input type="checkbox" />
              I agree to Takshaya Terms & Conditions.
            </label>

          </div>

          <div className="button-group">

            <Link to="/authorized-person">
              <button className="secondary-btn">
                ← Back
              </button>
            </Link>

          </div>

          <Link to="/verification-submitted">
            <AuthButton>
              Submit For Verification
            </AuthButton>
          </Link>

        </>
      }

      right={
        <>
          <h2>Almost Done 🎉</h2>

          <p>
            Once submitted, our verification team reviews your documents.
          </p>

          <ul className="feature-list">
            <li>✓ Verification in 24–48 Hours</li>
            <li>✓ Unlock Marketplace</li>
            <li>✓ Trusted Company Badge</li>
            <li>✓ Buyer & Supplier Network Access</li>
          </ul>

        </>
      }
    />
  );
}