import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../Styles/public.css";

export default function Terms() {
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
              Terms & Conditions
            </h1>

            <p>
              The terms governing access to and use of the
              Takshaya manufacturing ecosystem.
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
            <h2>Acceptance of Terms</h2>

            <p>
              By accessing or using Takshaya, you acknowledge that
              you have read, understood and agree to these Terms &
              Conditions.
            </p>
          </div>

          <div className="legal-section">
            <h2>Platform Purpose</h2>

            <p>
              Takshaya connects manufacturers, tool rooms, mould
              owners, die owners, OEMs, brand owners and industrial
              partners through a trusted manufacturing ecosystem.
            </p>
          </div>

          <div className="legal-section">
            <h2>User Responsibilities</h2>

            <ul>
              <li>Provide accurate and complete business information.</li>
              <li>Maintain confidentiality of account credentials.</li>
              <li>Use the platform only for lawful business purposes.</li>
              <li>Respect intellectual property and confidential information.</li>
              <li>Provide truthful information when creating listings or requirements.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>Business Verification</h2>

            <p>
              Takshaya may verify business information before granting
              access to certain platform features. Verification is
              intended to strengthen trust within the ecosystem and
              does not guarantee business performance, commercial
              success or completion of a transaction.
            </p>
          </div>

          <div className="legal-section">
            <h2>Marketplace Conduct</h2>

            <ul>
              <li>No fraudulent or misleading listings.</li>
              <li>No unauthorized use of another company's information.</li>
              <li>No misrepresentation of tools, moulds, dies or capabilities.</li>
              <li>No unlawful use of the platform.</li>
              <li>Users remain responsible for commercial agreements they enter into.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>Intellectual Property</h2>

            <p>
              Takshaya branding, logos, software, website design,
              platform features and proprietary content remain the
              property of Takshaya unless otherwise stated.
            </p>
          </div>

          <div className="legal-section">
            <h2>Commercial Transactions</h2>

            <p>
              Takshaya may facilitate connections between businesses.
              Users are responsible for evaluating counterparties,
              technical suitability, pricing, commercial terms,
              logistics, documentation and other transaction-related
              matters before entering into an agreement.
            </p>
          </div>

          <div className="legal-section">
            <h2>Limitation of Liability</h2>

            <p>
              Takshaya acts as a platform facilitating business
              connections. To the extent permitted by applicable law,
              users remain responsible for their own commercial
              decisions and agreements with other businesses.
            </p>
          </div>

          <div className="legal-section">
            <h2>Changes to These Terms</h2>

            <p>
              Takshaya may update these Terms from time to time.
              Continued use of the platform after an update may
              constitute acceptance of the revised Terms.
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