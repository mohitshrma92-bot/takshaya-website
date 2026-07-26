import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";

export default function Login() {
  return (
    <AuthLayout
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>Welcome Back</h2>

          <p>
            Sign in to access your Takshaya Manufacturing Dashboard.
          </p>

          <AuthInput
            label="Business Email"
            type="email"
            placeholder="Enter your business email"
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <div className="auth-links">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <AuthButton>
            Login →
          </AuthButton>

          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup">
              Create Account
            </Link>
          </div>
        </>
      }

       right={
        <div className="auth-right-content">

         <h1>India's Manufacturing Tooling Network</h1>

        <p>
        Connect manufacturers, tool rooms, mould owners and industrial partners
        on one trusted platform.
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