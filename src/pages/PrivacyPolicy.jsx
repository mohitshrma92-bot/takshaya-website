import { Link } from "react-router-dom";
import logo from "../assets/logo/takshaya-logo.png";
import AuthButton from "../components/auth/AuthButton";
import Navbar from "../components/Navbar";

export default function PrivacyPolicy() {
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

        <h1>Privacy Policy</h1>

        <p className="legal-intro">
          Effective Date: August 2026
        </p>

        <p>
          Takshaya ("we", "our", or "us") values your privacy. This Privacy
          Policy explains how we collect, use, protect, and share your
          information when you use the Takshaya platform.
        </p>

        <h2>Information We Collect</h2>

        <ul>
          <li>Company details</li>
          <li>Business contact information</li>
          <li>GST, PAN and UDYAM details (if provided)</li>
          <li>Authorized representative details</li>
          <li>Uploaded business documents</li>
          <li>Platform activity and usage data</li>
        </ul>

        <h2>How We Use Your Information</h2>

        <ul>
          <li>Verify business registrations.</li>
          <li>Build trusted manufacturing connections.</li>
          <li>Improve platform security.</li>
          <li>Provide customer support.</li>
          <li>Improve our products and services.</li>
        </ul>

        <h2>Information Sharing</h2>

        <p>
          Takshaya does not sell your personal or business information.
          Information may be shared only where necessary to provide platform
          services, comply with legal obligations, or protect users from fraud.
        </p>

        <h2>Data Security</h2>

        <p>
          We implement reasonable technical and organizational measures to
          protect your information from unauthorized access, misuse, or loss.
        </p>

        <h2>Your Rights</h2>

        <ul>
          <li>Access your information.</li>
          <li>Request corrections.</li>
          <li>Request deletion where legally permitted.</li>
          <li>Contact us regarding privacy concerns.</li>
        </ul>

        <h2>Cookies</h2>

        <p>
          Takshaya may use cookies and similar technologies to improve user
          experience, maintain secure sessions, and analyze website performance.
        </p>

        <h2>Contact</h2>

        <p>
          For privacy-related questions, please contact:
          <br />
          support@takshaya.com
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