import { Link } from "react-router-dom";
import logo from "../assets/logo/takshaya-logo.png";
import AuthButton from "../components/auth/AuthButton";

export default function ResetLinkSent() {
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

        <h1>Password Reset Link Sent</h1>

        <p className="thank-you-text">
          We've sent a secure password reset link to your registered
          business email address.
          <br /><br />
          Please check your inbox (and spam folder if needed).
        </p>

        <div className="next-steps">

          <h3>What's Next?</h3>

          <div className="step">
            <span>✓</span>
            <p>Open the email from Takshaya.</p>
          </div>

          <div className="step">
            <span>✓</span>
            <p>Click the password reset link.</p>
          </div>

          <div className="step">
            <span>✓</span>
            <p>Create a new secure password.</p>
          </div>

          <div className="step">
            <span>✓</span>
            <p>Login with your new password.</p>
          </div>

        </div>

        <div className="thank-you-buttons">

          <Link to="/login">
            <AuthButton variant="secondary">
              ← Back to Login
            </AuthButton>
          </Link>

          <Link to="/forgot-password">
            <AuthButton>
              Resend Email →
            </AuthButton>
          </Link>

        </div>

      </div>
    </section>
  );
}