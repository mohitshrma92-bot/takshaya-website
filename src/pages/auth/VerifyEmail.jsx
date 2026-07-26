import { Link, useNavigate } from "react-router-dom";
import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";

export default function VerifyEmail() {
  const navigate = useNavigate();
  return (
    <OnboardingLayout
      step={1}
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>Check Your Email</h2>

          <p>
            We've sent a verification link to your registered business email.
          </p>

          <div className="verify-card">
            <div className="verify-icon">📧</div>

            <h3>Verify your email</h3>

            <p>
              Click the verification link in your inbox to continue your company
              registration.
            </p>

            <AuthButton
              onClick={() => navigate("/company-profile")}
            >
              I've Verified My Email →
            </AuthButton>

            <button className="text-button">
              Resend Verification Email
            </button>
          </div>

          <div className="auth-footer">
            <Link to="/login">← Back to Login</Link>
          </div>
        </>
      }
    />
  );
}