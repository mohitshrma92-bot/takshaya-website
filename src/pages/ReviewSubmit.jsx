import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

export default function ReviewSubmit() {

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

          <h2>Review & Submit</h2>

          <p>
            Review all your company details before submitting them for verification. You can edit any section if required.
          </p>

          <div className="review-card">

            <div className="review-row">
              <span>Company Profile</span>
              <button
                className="edit-btn"
                onClick={() => navigate("/company-profile")}
              >
               Edit
            </button>
            </div>

            <div className="review-row">
              <span>Business Roles</span>
              <button
               className="edit-btn"
               onClick={() => navigate("/business-roles")}
             >
              Edit
            </button>
            </div>

            <div className="review-row">
              <span>GST Verification</span>
              <button
                className="edit-btn"
                onClick={() => navigate("/gst-verification")}
              >
                Edit
              </button>
            </div>

            <div className="review-row">
              <span>PAN Verification</span>
              <button
               className="edit-btn"
               onClick={() => navigate("/pan-verification")}
              >
               Edit
              </button>
            </div>

            <div className="review-row">
              <span>UDYAM Registration</span>
              <button
                className="edit-btn"
                onClick={() => navigate("/udyam-verification")}
              >
                Edit
              </button>
            </div>

            <div className="review-row">
              <span>Factory Address</span>
              <button
                className="edit-btn"
                onClick={() => navigate("/factory-address")}
              >
                Edit
              </button>
            </div>

            <div className="review-row">
              <span>Authorized Representative</span>
              <button
                className="edit-btn"
                onClick={() => navigate("/authorized-person")}
              >
                Edit
              </button>
            </div>

          </div>

          <div className="checkbox-group">

            <label>
              <input type="checkbox" />
              I certify that all information provided is accurate.
            </label>

            <label>
              <input type="checkbox" />
              I agree to the Takshaya Terms & Conditions.
            </label>

          </div>

          <div className="button-group">

            <AuthButton
              variant="secondary"
              onClick={() => navigate("/authorized-person")}
            >
              ← Back
            </AuthButton>

            <AuthButton
              onClick={() => navigate("/thank-you")}
            >
              Submit for Verification →
            </AuthButton>

          </div>

        </>
      }

      right={
        <div className="auth-right-content">

          <h1>Ready for Company Verification</h1>

          <p>
            Once submitted, our verification team will review your business documents and activate your Takshaya account.
          </p>

          <div className="auth-features">

            <div className="feature-item">
              ✓ Company Verification
            </div>

            <div className="feature-item">
              ✓ Trusted Marketplace
            </div>

            <div className="feature-item">
              ✓ Secure Transactions
            </div>

            <div className="feature-item">
              ✓ Verified Manufacturing Network
            </div>

          </div>

          <div className="auth-stats">

            <div>
              <h3>24–48 Hours</h3>
              <span>Verification Time</span>
            </div>

            <div>
              <h3>100%</h3>
              <span>Secure</span>
            </div>

            <div>
              <h3>500+</h3>
              <span>Verified Companies</span>
            </div>

          </div>

        </div>
      }
    />
  );
}