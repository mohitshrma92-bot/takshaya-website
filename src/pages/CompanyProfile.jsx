import AuthLayout from "../layouts/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

export default function CompanyProfile() {
  return (
    <AuthLayout
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>Complete Company Profile</h2>

          <p>
            Help us understand your business before joining India's
            Manufacturing Tooling Exchange.
          </p>

          <form className="auth-form">

            <AuthInput
              label="Company Name"
              placeholder="ABC Engineering Pvt Ltd"
            />

            <AuthInput
              label="Business Email"
              placeholder="info@company.com"
            />

            <AuthInput
              label="Mobile Number"
              placeholder="+91 9876543210"
            />

            <AuthInput
              label="Website"
              placeholder="https://"
            />

            <AuthInput
              label="City"
              placeholder="Mumbai"
            />

            <AuthInput
              label="State"
              placeholder="Maharashtra"
            />

            <AuthButton>
              Continue →
            </AuthButton>

          </form>
        </>
      }

      right={
        <>
          <h2>Build Your Company Profile</h2>

          <p>
            Your company profile helps us match you with the right
            manufacturers, brands, tool owners and tooling partners.
          </p>

          <ul className="feature-list">
            <li>✓ Verified Manufacturing Network</li>
            <li>✓ Better Business Matching</li>
            <li>✓ Faster RFQ Processing</li>
            <li>✓ Secure Transactions</li>
          </ul>
        </>
      }
    />
  );
}