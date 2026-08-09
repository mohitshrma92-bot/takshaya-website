import { Link } from "react-router-dom";
import logo from "../assets/logo/takshaya-logo.png";
import AuthButton from "../components/auth/AuthButton";
import Navbar from "../components/Navbar";

export default function Terms() {
  return (
    <>
      <Navbar />
      <section className="legal-page">

      <div className="legal-container">

        <img
          src={logo}
          alt="Takshaya"
          className="legal-logo"
        />

        <h1>Terms & Conditions</h1>

        <p className="legal-intro">
          Effective Date: August 2026
        </p>

        <p>
          By accessing or using Takshaya, you agree to these Terms &
          Conditions.
        </p>

        <h2>Platform Purpose</h2>

        <p>
          Takshaya connects manufacturers, tool rooms, mould owners,
          die owners, OEMs, brand owners, and industrial partners
          through a trusted manufacturing ecosystem.
        </p>

        <h2>User Responsibilities</h2>

        <ul>
          <li>Provide accurate business information.</li>
          <li>Maintain confidentiality of account credentials.</li>
          <li>Use the platform only for lawful business purposes.</li>
          <li>Respect intellectual property rights.</li>
        </ul>

        <h2>Verification</h2>

        <p>
          Takshaya may verify business information before granting access
          to certain platform features. Verification does not guarantee
          business performance or future transactions.
        </p>

        <h2>Marketplace Conduct</h2>

        <ul>
          <li>No fraudulent listings.</li>
          <li>No misleading business information.</li>
          <li>No unauthorized use of another company's data.</li>
          <li>Users remain responsible for agreements made outside the platform.</li>
        </ul>

        <h2>Intellectual Property</h2>

        <p>
          All Takshaya branding, logos, software, and platform content
          remain the property of Takshaya unless otherwise stated.
        </p>

        <h2>Limitation of Liability</h2>

        <p>
          Takshaya acts as a platform facilitating business connections.
          Users remain responsible for evaluating and entering into
          commercial agreements with each other.
        </p>

        <h2>Changes to These Terms</h2>

        <p>
          We may update these Terms from time to time. Continued use of
          the platform constitutes acceptance of any revised Terms.
        </p>

        <div className="legal-buttons">

          <Link to="/">
             <AuthButton variant="secondary">
              ← Back Home
            </AuthButton>
          </Link>

          <Link to="/signup">
            <AuthButton>
              Join Takshaya →
            </AuthButton>
          </Link>

        </div>

      </div>

    </section>
   </>
  );
}