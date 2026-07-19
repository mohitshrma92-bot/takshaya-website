import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";

export default function PANVerification() {
  return (
    <AuthLayout
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>PAN Verification</h2>

          <p>
            Verify your company's Permanent Account Number.
          </p>

          <AuthInput
            label="PAN Number"
            placeholder="Enter Company PAN Number"
          />

          <label className="auth-label">
            Business Entity
          </label>

          <select className="auth-select">
            <option>Private Limited</option>
            <option>LLP</option>
            <option>Partnership</option>
            <option>Proprietorship</option>
            <option>Public Limited</option>
            <option>One Person Company (OPC)</option>
          </select>

          <div className="upload-box">
            <h4>PAN Document</h4>

            <p>
              Upload Company PAN Card
            </p>

            <input type="file" />
          </div>

          <div className="button-group">
            <Link to="/gst-verification">
              <button className="secondary-btn">
                ← Back
              </button>
            </Link>

            <Link to="/udyam-verification">
              <AuthButton>
                Continue →
              </AuthButton>
            </Link>
          </div>
        </>
      }

      right={
        <>
          <h2>Tax Identity</h2>

          <p>
            PAN verification ensures your legal business identity
            matches government tax records.
          </p>

          <ul className="feature-list">
            <li>✓ Legal Entity Verification</li>
            <li>✓ Tax Identity</li>
            <li>✓ Trust Score +10</li>
            <li>✓ Secure Transactions</li>
          </ul>
        </>
      }
    />
  );
}