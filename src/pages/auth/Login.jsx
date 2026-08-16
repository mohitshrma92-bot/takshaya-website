import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your business email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    /*
      MVP LOGIN

      Authentication will be connected to the backend later.
      For now we simply allow the user to continue.
    */

    navigate("/dashboard");
  };

  return (
    <AuthLayout
      left={
        <form onSubmit={handleLogin}>
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <div className="auth-links">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <AuthButton type="submit">
            Login →
          </AuthButton>

          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup">
              Create Account
            </Link>
          </div>
        </form>
      }

      right={
        <div className="auth-right-content">

          <h1>
            India's Manufacturing Tooling Network
          </h1>

          <p>
            Connect manufacturers, tool rooms, mould owners
            and industrial partners on one trusted platform.
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