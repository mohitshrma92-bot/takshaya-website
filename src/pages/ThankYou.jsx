import { Link } from "react-router-dom";
import logo from "../assets/logo/takshaya-logo.png";

export default function ThankYou() {
  return (
    <section className="thank-you-page">
      <div className="thank-you-card">

        <img
          src={logo}
          alt="Takshaya"
          className="thank-you-logo"
        />

        <div className="success-icon">
          ✓
        </div>

        <h1>Registration Submitted Successfully</h1>

        <p className="thank-you-text">
          Thank you for joining Takshaya.
          <br />
          Your registration has been received successfully.
        </p>

        <div className="next-steps">

          <h3>What happens next?</h3>

          <div className="step">
            <span>1.</span>
            <p>Our team reviews your business details.</p>
          </div>

          <div className="step">
            <span>2.</span>
            <p>Your company verification is completed.</p>
          </div>

          <div className="step">
            <span>3.</span>
            <p>Your Takshaya dashboard is activated.</p>
          </div>

          <div className="step">
            <span>4.</span>
            <p>Start listing tools or posting requirements.</p>
          </div>

        </div>

        <div className="thank-you-buttons">

          <Link to="/">
            <button className="secondary-btn">
              Back to Home
            </button>
          </Link>

          <Link to="/dashboard">
            <button className="primary-btn">
              Go to Dashboard →
            </button>
          </Link>

        </div>

      </div>
    </section>
  );
}