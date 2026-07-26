import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = () => {
    // Firebase signup will be added here later.
    // For now, continue to the next onboarding step.
    navigate("/verify-email");
  };

  return (
    <AuthLayout
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>Create Company Account</h2>

          <p>
            Join India's Verified Manufacturing Tooling Exchange.
          </p>

          <AuthInput
            label="Company Name"
            placeholder="ABC Engineering Pvt. Ltd."
          />

          <AuthInput
            label="Business Email"
            type="email"
            placeholder="info@company.com"
          />

          <AuthInput
            label="Mobile Number"
            placeholder="+91 9876543210"
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Create Password"
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
          />

          <label className="terms-check">
            <input type="checkbox" />
            I agree to the Terms & Privacy Policy
          </label>

          <AuthButton onClick={handleSignup}>
            Create Company Account →
          </AuthButton>

          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">
              Sign In
            </Link>
          </div>
        </>
      }

      right={
        <div className="auth-right-content">

          <h1>India's Manufacturing Tooling Network</h1>

          <p>
            Connect manufacturers, tool rooms, mould owners and industrial
            partners on one trusted platform.
          </p>

          <div className="auth-features">

            <div className="feature-item">
              ✓ Verified Manufacturers
            </div>

            <div className="feature-item">
              ✓ Verified Tool Rooms
            </div>

            <div className="feature-item">
              ✓ Secure Collaboration
            </div>

            <div className="feature-item">
              ✓ Faster Tool Procurement
            </div>

          </div>

          <div className="auth-stats">

            <div>
              <h3>100K+</h3>
              <span>Moulds & Dies</span>
            </div>

            <div>
              <h3>10K+</h3>
              <span>Tool Rooms</span>
            </div>

            <div>
              <h3>50K+</h3>
              <span>Manufacturers</span>
            </div>

          </div>

          <p className="auth-trust">
            Trusted by India's growing manufacturing ecosystem.
          </p>

        </div>
      }
    />
  );
}