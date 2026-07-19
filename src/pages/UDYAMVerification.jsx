import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

export default function UDYAMVerification() {
  return (
    <AuthLayout
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>UDYAM Registration</h2>

          <p>
            UDYAM registration is optional but helps increase your
            Takshaya Trust Score and gives more confidence to buyers.
          </p>

          <AuthInput
            label="UDYAM Registration Number"
            placeholder="UDYAM-MH-00-0000000"
          />

          <label className="auth-label">
            MSME Category
          </label>

          <select className="auth-select">
            <option>Micro Enterprise</option>
            <option>Small Enterprise</option>
            <option>Medium Enterprise</option>
            <option>Not Registered</option>
          </select>

          <div className="upload-box">
            <h4>UDYAM Certificate</h4>

            <p>
              Upload your UDYAM Registration Certificate (Optional)
            </p>

            <input type="file" />
          </div>

          <div className="button-group">
            <Link to="/pan-verification">
              <button className="secondary-btn">
                ← Back
              </button>
            </Link>
          </div>

          <Link to="/factory-address">
            <AuthButton>
              Continue →
            </AuthButton>
          </Link>
        </>
      }

      right={
        <>
          <h2>MSME Benefits</h2>

          <p>
            Registering your UDYAM details increases trust and
            identifies your business as a recognized MSME.
          </p>

          <ul className="feature-list">
            <li>✓ MSME Recognition</li>
            <li>✓ Higher Trust Score</li>
            <li>✓ Better Buyer Confidence</li>
            <li>✓ Priority Marketplace Visibility</li>
          </ul>
        </>
      }
    />
  );
}