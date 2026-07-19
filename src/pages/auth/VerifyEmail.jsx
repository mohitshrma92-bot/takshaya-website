import logo from "../../assets/logo/takshaya-logo.png";
import AuthButton from "../../components/auth/AuthButton";

export default function VerifyEmail() {
  return (
    <div className="auth-page">

      <div className="auth-left">

        <img
         src={logo}
         alt="Takshaya"
         className="auth-logo-image"
        />

        <h2>Verify Your Business Email</h2>

        <p>
          We've sent a verification email to your registered business email address.
        </p>

        <div className="verify-card">

          <div className="verify-icon">
            📧
          </div>

          <h3>Check Your Inbox</h3>

          <p>
            Click the verification link in your email to continue.
          </p>

          <AuthButton>
            Continue
          </AuthButton>

          <button className="text-button">
            Resend Verification Email
          </button>

        </div>

      </div>

      <div className="auth-right">

        <h2>Almost There!</h2>

        <p>
          Email verification helps us ensure that every company on Takshaya is genuine before entering our verified manufacturing network.
        </p>

      </div>

    </div>
  );
}