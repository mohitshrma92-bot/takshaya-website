import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

export default function AuthorizedPerson() {
  return (
    <AuthLayout
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>Authorized Representative</h2>

          <p>
            Tell us who will represent your company on Takshaya.
          </p>

          <AuthInput
            label="Full Name"
            placeholder="John Sharma"
          />

          <AuthInput
            label="Designation"
            placeholder="Director / Owner / Manager"
          />

          <AuthInput
            label="Business Email"
            placeholder="john@company.com"
          />

          <AuthInput
            label="Mobile Number"
            placeholder="+91 9876543210"
          />

          <div className="upload-box">
            <h4>Government ID</h4>

            <p>
              Upload Aadhaar / Passport / Driving Licence
              (Optional)
            </p>

            <input type="file" />
          </div>

          <div className="button-group">
            <Link to="/factory-address">
              <button className="secondary-btn">
                ← Back
              </button>
            </Link>
          </div>

          <Link to="/review-submit">
            <AuthButton>
              Continue →
            </AuthButton>
          </Link>
        </>
      }

      right={
        <>
          <h2>Account Security</h2>

          <p>
            The authorized representative becomes the primary
            administrator for your company's Takshaya account.
          </p>

          <ul className="feature-list">
            <li>✓ Account Ownership</li>
            <li>✓ Secure Communication</li>
            <li>✓ Order Approval Rights</li>
            <li>✓ Trust Score +10</li>
          </ul>
        </>
      }
    />
  );
}