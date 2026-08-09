import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";

export default function VerificationSubmitted() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      left={
        <div className="submission-page">

          <div className="success-icon">
            ✓
          </div>

          <div className="submission-label">
            VERIFICATION SUBMITTED
          </div>

          <h2>
            Your business is
            <br />
            under verification
          </h2>

          <p className="submission-description">
            Thank you for completing your Takshaya business onboarding.
            Your information has been submitted successfully.
          </p>

          <div className="submission-card">

            <div className="submission-card-header">
              <span>Application Status</span>

              <span className="status-badge">
                Submitted
              </span>
            </div>

            <div className="submission-divider" />

            <div className="submission-row">
              <span>Business Profile</span>
              <strong>Completed</strong>
            </div>

            <div className="submission-row">
              <span>Business Roles</span>
              <strong>Completed</strong>
            </div>

            <div className="submission-row">
              <span>GST Verification</span>
              <strong>Verified</strong>
            </div>

            <div className="submission-row">
              <span>PAN Verification</span>
              <strong>Verified</strong>
            </div>

            <div className="submission-row">
              <span>UDYAM Verification</span>
              <strong>Verified</strong>
            </div>

            <div className="submission-row">
              <span>Factory Address</span>
              <strong>Submitted</strong>
            </div>

            <div className="submission-row">
              <span>Authorized Representative</span>
              <strong>Submitted</strong>
            </div>

          </div>

          <div className="submission-info">

            <h4>What happens next?</h4>

            <p>
              Takshaya will review the submitted information and
              verification records. Once approved, your business profile
              will be activated on the platform.
            </p>

          </div>

          <AuthButton
            onClick={() => navigate("/")}
          >
            Go to Takshaya Home →
          </AuthButton>

        </div>
      }

      right={
        <div className="auth-right-content">

          <div className="submission-brand">
            TAKSHAYA
          </div>

          <h1>
            Building
            <br />
            Trusted
            <br />
            Manufacturing
            <br />
            Networks.
          </h1>

          <p>
            Your business information helps us build a more trusted
            manufacturing ecosystem where companies, tooling partners
            and service providers can collaborate with confidence.
          </p>

          <div className="auth-features">

            <div className="feature-item">
              ✓ Business information received
            </div>

            <div className="feature-item">
              ✓ Government verification records submitted
            </div>

            <div className="feature-item">
              ✓ Authorized representative recorded
            </div>

            <div className="feature-item">
              ✓ Application ready for review
            </div>

          </div>

          <div className="auth-stats">

            <div>
              <h3>10</h3>
              <span>Onboarding Steps</span>
            </div>

            <div>
              <h3>Verified</h3>
              <span>Business Identity</span>
            </div>

            <div>
              <h3>Secure</h3>
              <span>Data Handling</span>
            </div>

          </div>

          <p className="auth-trust">
            Verification is the first step towards building trusted
            manufacturing relationships.
          </p>

        </div>
      }
    />
  );
}