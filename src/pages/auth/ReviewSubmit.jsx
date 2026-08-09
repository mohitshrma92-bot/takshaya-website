import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthButton from "../../components/auth/AuthButton";

import "../../Styles/auth/auth.css";

export default function ReviewSubmit() {
  const navigate = useNavigate();

  const [confirmInformation, setConfirmInformation] = useState(false);
  const [authorizeVerification, setAuthorizeVerification] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!confirmInformation || !authorizeVerification) {
      setError(
        "Please accept both declarations before submitting your application."
      );
      return;
    }

    /*
      Temporary MVP behaviour.

      Later this will:
      1. Save onboarding data to Supabase
      2. Create the company verification record
      3. Upload supporting documents
      4. Trigger Takshaya verification workflow
    */

    localStorage.setItem(
      "takshaya_onboarding_status",
      "submitted"
    );

    navigate("/verification-submitted");
  };

  return (
    <OnboardingLayout
      step={9}
      left={
        <form onSubmit={handleSubmit}>

          <h2>Review & Submit</h2>

          <p>
            Review the information provided during onboarding before
            submitting your company for verification.
          </p>

          {/* COMPANY INFORMATION */}

          <div className="review-section">

            <div className="review-section-header">
              <div>
                <h3>Company Information</h3>
                <span>Company Profile</span>
              </div>

              <button
                type="button"
                className="review-edit-button"
                onClick={() => navigate("/company-profile")}
              >
                Edit
              </button>
            </div>

            <div className="review-grid">

              <div className="review-item">
                <span>Legal Company Name</span>
                <strong>Not provided</strong>
              </div>

              <div className="review-item">
                <span>Trade / Brand Name</span>
                <strong>Not provided</strong>
              </div>

              <div className="review-item">
                <span>Year Established</span>
                <strong>Not provided</strong>
              </div>

              <div className="review-item">
                <span>Primary Industry</span>
                <strong>Not provided</strong>
              </div>

              <div className="review-item">
                <span>Company Size</span>
                <strong>Not provided</strong>
              </div>

              <div className="review-item">
                <span>Website</span>
                <strong>Not provided</strong>
              </div>

            </div>

          </div>

          {/* BUSINESS ROLES */}

          <div className="review-section">

            <div className="review-section-header">
              <div>
                <h3>Business Roles</h3>
                <span>Business Role</span>
              </div>

              <button
                type="button"
                className="review-edit-button"
                onClick={() => navigate("/business-roles")}
              >
                Edit
              </button>
            </div>

            <div className="review-tags">

              <span className="review-tag">
                Manufacturer
              </span>

              <span className="review-tag">
                Tool Room
              </span>

            </div>

          </div>

          {/* GOVERNMENT VERIFICATION */}

          <div className="review-section">

            <div className="review-section-header">
              <div>
                <h3>Government Verification</h3>
                <span>Business Identity</span>
              </div>
            </div>

            <div className="verification-list">

              <div className="verification-row">

                <div>
                  <strong>GST Verification</strong>
                  <span>GSTIN verified</span>
                </div>

                <div className="verified-badge">
                  ✓ Verified
                </div>

              </div>

              <div className="verification-row">

                <div>
                  <strong>PAN Verification</strong>
                  <span>PAN verified</span>
                </div>

                <div className="verified-badge">
                  ✓ Verified
                </div>

              </div>

              <div className="verification-row">

                <div>
                  <strong>UDYAM Verification</strong>
                  <span>MSME registration verified</span>
                </div>

                <div className="verified-badge">
                  ✓ Verified
                </div>

              </div>

            </div>

          </div>

          {/* FACTORY ADDRESS */}

          <div className="review-section">

            <div className="review-section-header">

              <div>
                <h3>Factory / Operating Location</h3>
                <span>Factory Address</span>
              </div>

              <button
                type="button"
                className="review-edit-button"
                onClick={() => navigate("/factory-address")}
              >
                Edit
              </button>

            </div>

            <div className="review-item">

              <span>Operating Address</span>

              <strong>
                Address details will appear here
              </strong>

            </div>

          </div>

          {/* AUTHORIZED PERSON */}

          <div className="review-section">

            <div className="review-section-header">

              <div>
                <h3>Authorized Representative</h3>
                <span>Company Representative</span>
              </div>

              <button
                type="button"
                className="review-edit-button"
                onClick={() => navigate("/authorized-person")}
              >
                Edit
              </button>

            </div>

            <div className="review-grid">

              <div className="review-item">
                <span>Full Name</span>
                <strong>Not provided</strong>
              </div>

              <div className="review-item">
                <span>Designation</span>
                <strong>Not provided</strong>
              </div>

              <div className="review-item">
                <span>Business Email</span>
                <strong>Not provided</strong>
              </div>

              <div className="review-item">
                <span>Mobile Number</span>
                <strong>Not provided</strong>
              </div>

            </div>

            <div className="authorization-confirmed">
              ✓ Authorized to represent the company
            </div>

          </div>

          {/* DECLARATIONS */}

          <div className="review-declarations">

            <label className="declaration-option">

              <input
                type="checkbox"
                checked={confirmInformation}
                onChange={(e) => {
                  setConfirmInformation(e.target.checked);
                  setError("");
                }}
              />

              <span>
                I confirm that the information provided by my company
                is accurate and complete.
              </span>

            </label>

            <label className="declaration-option">

              <input
                type="checkbox"
                checked={authorizeVerification}
                onChange={(e) => {
                  setAuthorizeVerification(e.target.checked);
                  setError("");
                }}
              />

              <span>
                I authorize Takshaya to verify the information and
                documents submitted during onboarding.
              </span>

            </label>

          </div>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          {/* BUTTONS */}

          <div className="button-group">

            <AuthButton
              variant="secondary"
              type="button"
              onClick={() => navigate("/authorized-person")}
            >
              ← Back
            </AuthButton>

            <AuthButton type="submit">
              Submit for Verification →
            </AuthButton>

          </div>

        </form>
      }

      right={
        <div className="auth-right-content">

          <div className="auth-badge">
            TAKSHAYA
          </div>

          <h1>
            Ready to
            <br />
            Build Together.
          </h1>

          <p>
            Your company information has been collected. Review the
            details carefully before submitting your business for
            Takshaya verification.
          </p>

          <div className="auth-features">

            <div className="feature-item">
              ✓ Business Identity Verified
            </div>

            <div className="feature-item">
              ✓ Government Records Checked
            </div>

            <div className="feature-item">
              ✓ Company Information Reviewed
            </div>

            <div className="feature-item">
              ✓ Authorized Representative Confirmed
            </div>

          </div>

          <div className="auth-stats">

            <div>
              <h3>9/9</h3>
              <span>Steps Complete</span>
            </div>

            <div>
              <h3>Verified</h3>
              <span>Business Identity</span>
            </div>

            <div>
              <h3>Ready</h3>
              <span>For Review</span>
            </div>

          </div>

          <p className="auth-trust">
            Once submitted, Takshaya will review your business profile
            before granting full platform access.
          </p>

        </div>
      }
    />
  );
}