import { Link } from "react-router-dom";
import logo from "../assets/logo/takshaya-logo.png";
import "../Styles/public.css";

export default function Footer() {
  return (
    <footer className="site-footer">

      <div className="site-footer-main">

        {/* BRAND */}

        <div className="site-footer-brand">

          <Link to="/">
            <img
              src={logo}
              alt="Takshaya"
            />
          </Link>

          <p>
            Building a trusted manufacturing ecosystem that helps
            businesses access tooling, manufacturing capabilities
            and industrial partnerships with greater ease.
          </p>

        </div>

        {/* PLATFORM */}

        <div className="site-footer-column">

          <h3>
            Platform
          </h3>

          <Link to="/marketplace">
            Marketplace
          </Link>

          <Link to="/rfq/create">
            Create Requirement
          </Link>

          <Link to="/signup">
            Join Takshaya
          </Link>

          <Link to="/login">
            Login
          </Link>

        </div>

        {/* COMPANY */}

        <div className="site-footer-column">

          <h3>
            Company
          </h3>

          <Link to="/about">
            About Takshaya
          </Link>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link to="/">
            Industries
          </Link>

          <Link to="/">
            Our Journey
          </Link>

        </div>

        {/* LEGAL */}

        <div className="site-footer-column">

          <h3>
            Legal
          </h3>

          <Link to="/privacy-policy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

          <Link to="/contact">
            Support
          </Link>

          <a href="mailto:support@takshaya.com">
            support@takshaya.com
          </a>

        </div>

      </div>

      <div className="site-footer-bottom">

        <div className="site-footer-bottom-inner">

          <p>
            © {new Date().getFullYear()} Takshaya. All rights reserved.
          </p>

          <p>
            Building India's Manufacturing Backbone.
          </p>

        </div>

      </div>

    </footer>
  );
}