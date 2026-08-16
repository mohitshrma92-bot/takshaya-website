import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../Styles/public.css";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <main className="public-page legal-page">

        <section className="public-page-hero">
          <div className="public-page-hero-inner">
            <span className="public-eyebrow">
              LEGAL
            </span>

            <h1>
              Privacy Policy
            </h1>

            <p>
              How Takshaya collects, uses, protects and manages
              business and personal information across the platform.
            </p>
          </div>
        </section>

        <div className="legal-container">

          <div className="legal-header">
            <div className="legal-effective">
              Effective Date: August 2026
            </div>
          </div>

          <div className="legal-section">
            <h2>Introduction</h2>

            <p>
              Takshaya ("we", "our", or "us") values your privacy.
              This Privacy Policy explains how we collect, use,
              protect and share information when you access or use
              the Takshaya platform.
            </p>
          </div>

          <div className="legal-section">
            <h2>Information We Collect</h2>

            <ul>
              <li>Company and business information.</li>
              <li>Business contact information.</li>
              <li>GST, PAN and UDYAM information, where provided.</li>
              <li>Authorized representative information.</li>
              <li>Business documents uploaded during verification.</li>
              <li>Platform activity and usage information.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>How We Use Your Information</h2>

            <ul>
              <li>To verify business registrations and identity.</li>
              <li>To create and maintain verified business profiles.</li>
              <li>To facilitate trusted manufacturing connections.</li>
              <li>To improve platform security and reliability.</li>
              <li>To provide customer support.</li>
              <li>To improve our products and services.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>Information Sharing</h2>

            <p>
              Takshaya does not sell your personal or business
              information. Information may be shared where reasonably
              necessary to provide platform services, comply with
              applicable legal obligations, prevent fraud or protect
              the rights and security of Takshaya and its users.
            </p>
          </div>

          <div className="legal-section">
            <h2>Data Security</h2>

            <p>
              We use reasonable technical and organizational measures
              designed to protect information from unauthorized access,
              misuse, alteration, disclosure or loss.
            </p>
          </div>

          <div className="legal-section">
            <h2>Your Rights</h2>

            <ul>
              <li>Request access to information associated with you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion where legally permitted.</li>
              <li>Contact Takshaya regarding privacy concerns.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>Cookies and Similar Technologies</h2>

            <p>
              Takshaya may use cookies and similar technologies to
              maintain secure sessions, improve user experience and
              understand website performance.
            </p>
          </div>

          <div className="legal-section">
            <h2>Contact</h2>

            <p>
              For privacy-related questions or requests, please
              contact Takshaya through our Contact page or email
              support@takshaya.com.
            </p>
          </div>

          <div className="legal-footer-actions">
            <Link
              to="/"
              className="public-link-button public-link-secondary"
            >
              ← Back to Home
            </Link>

            <Link
              to="/contact"
              className="public-link-button public-link-primary"
            >
              Contact Takshaya →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}