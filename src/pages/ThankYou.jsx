import { Link } from "react-router-dom";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

export default function ThankYou() {
  return (
    <section className="thank-you-page">

      <div className="thank-you-card">

        <img
          src={logo}
          alt="Takshaya"
          className="thank-you-logo"
        />

        <div className="success-icon">
          ✓
        </div>

        <h1>Company Registration Submitted</h1>

        <p className="thank-you-text">
          Thank you for registering with <strong>Takshaya</strong>.
          <br /><br />
          Your company profile and verification documents have been
          successfully submitted.
          <br /><br />
          Our verification team will review your application within
          <strong> 1–2 Business Days</strong>
        </p>

        {/* Verification Information */}

        <div className="verification-box">

          <div className="verification-item">
            <span>Reference ID</span>
            <strong>Will be assigned during verification</strong>
          </div>

          <div className="verification-item">
            <span>Verification Time</span>
            <strong>24–48 Hours</strong>
          </div>

          <div className="verification-item">
            <span>Status</span>
            <strong className="pending-status">
              Pending Verification
            </strong>
          </div>

        </div>

        {/* What Happens Next */}

        <div className="next-steps">

          <h3>What Happens Next?</h3>

          <div className="step">
            <span>✓</span>
            <p>Our verification team reviews your business documents.</p>
          </div>

          <div className="step">
            <span>✓</span>
            <p>Your company information is verified.</p>
          </div>

          <div className="step">
            <span>✓</span>
            <p>Your Takshaya account will be activated.</p>
          </div>

          <div className="step">
            <span>✓</span>
            <p>
              Once approved, you'll be able to list moulds, 
              post tooling requirements and connect with verified manufacturing partners.
            </p>
          </div>

        </div>

        {/* Email Notice */}

        <div className="email-info">

          📧 A confirmation email has been sent to your registered
          business email address.

        </div>

        {/* Buttons */}
        <div className="support-box">

        <strong>Need Help?</strong>

        <p>support@takshaya.com</p>

        <p>Monday – Saturday</p>

        <p>9:00 AM – 6:00 PM</p>

      </div>

        <div className="thank-you-buttons">

          <Link to="/login">

            <button className="secondary-btn">
              ← Back to Login
            </button>

          </Link>

          <Link to="/dashboard">

            <AuthButton>
              Go to Login →
            </AuthButton>

          </Link>

        </div>

        {/* Footer */}

        <div className="thank-you-footer">

          <p>
            Need assistance?
          </p>

          <p>
            <strong>support@takshaya.com</strong>
          </p>

          <p>
            www.takshaya.com
          </p>

        </div>

      </div>

    </section>
  );
}