import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

export default function AuthorizedPerson() {

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
              <br />
              (Optional)
            </p>

            <input type="file" />

          </div>

          <div className="upload-box">

            <h4>Profile Photo</h4>

            <p>
              Upload Passport Size Photograph
              <br />
              (Optional)
            </p>

            <input type="file" />

          </div>

          <div className="button-group">

            <AuthButton
              variant="secondary"
              onClick={() => navigate("/factory-address")}
            >
              ← Back
            </AuthButton>

            <AuthButton
              onClick={() => navigate("/review-submit")}
            >
              Continue →
            </AuthButton>

          </div>

        </>
      }

      right={
        <div className="auth-right-content">

          <h1>Authorized Representative</h1>

          <p>
            This person will represent your company on Takshaya and manage
            verification, customer communication and business approvals.
          </p>

          <div className="auth-features">

            <div className="feature-item">
              ✓ Company Administrator
            </div>

            <div className="feature-item">
              ✓ Secure Communication
            </div>

            <div className="feature-item">
              ✓ Order Approval Rights
            </div>

            <div className="feature-item">
              ✓ Trust Score +10
            </div>

          </div>

          <div className="auth-stats">

            <div>
              <h3>1</h3>
              <span>Representative</span>
            </div>

            <div>
              <h3>100%</h3>
              <span>Secure</span>
            </div>

            <div>
              <h3>Verified</h3>
              <span>Identity</span>
            </div>

          </div>

        </div>
      }
    />
  );
}