import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";

export default function Signup() {
  return (
    <div className="auth-page">

      {/* Left Side */}
      <div className="auth-left">

        <h1 className="auth-logo">
          TAKSHAYA
        </h1>

        <h2>Create Company Account</h2>

        <p>
          Join India's Verified Manufacturing Tooling Exchange.
        </p>

        <form className="auth-form">

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
            placeholder="********"
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="********"
          />

          <div className="terms">
            <input type="checkbox" />

            <span>
              I agree to the Terms & Privacy Policy
            </span>
          </div>

          <AuthButton>
            Create Company Account
          </AuthButton>

        </form>

        <p className="auth-link">
          Already have an account?

          <a href="/login">
            Sign In
          </a>

        </p>

      </div>

      {/* Right Side */}

      <div className="auth-right">

        <h2>
          Welcome to Takshaya
        </h2>

        <p>
          A trusted manufacturing ecosystem connecting
          manufacturers, brands, tool owners and tool rooms
          through one verified digital platform.
        </p>

      </div>

    </div>
  );
}