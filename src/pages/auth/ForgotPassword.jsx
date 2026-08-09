import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";
export default function ForgotPassword() {
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

          <h2>Forgot Password?</h2>

          <p>
            Enter your registered business email address and we'll send you a
            password reset link.
          </p>

          <AuthInput
            label="Business Email"
            type="email"
            placeholder="info@company.com"
          />

          <AuthButton
           onClick={() => navigate("/reset-link-sent")}
          >
            Send Reset Link
          </AuthButton>

          <div className="auth-footer">
            Remember your password?{" "}
            <Link to="/login">
              Back to Login
            </Link>
          </div>
        </>
      }

      right={
        <div className="auth-right-content">

          <h1>Secure Account Recovery</h1>

          <p>
            Your account security is important to us. We'll send a secure
            password reset link to your registered email address.
          </p>

          <div className="auth-features">
            <div className="feature-item">✓ Secure Reset Link</div>
            <div className="feature-item">✓ Email Verification</div>
            <div className="feature-item">✓ Account Protection</div>
            <div className="feature-item">✓ Quick Recovery Process</div>
          </div>

        </div>
      }
    />
  );
}