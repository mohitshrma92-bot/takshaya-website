import logo from "../assets/logo/takshaya-logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* Brand */}
        <div>
          <img
            src={logo}
            alt="Takshaya"
            className="footer-logo"
          />

          <p>
            Building India's Manufacturing Backbone through a
            trusted tooling exchange platform.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3>Company</h3>

          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
        </div>

        {/* Legal */}
        <div>
          <h3>Legal</h3>

          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms &amp; Conditions</a>
        </div>

        {/* Contact */}
        <div>
          <h3>Contact</h3>

          <p>support@takshaya.com</p>
          <p>Mumbai, Maharashtra, India</p>
        </div>

      </div>

      <div className="container copyright">
        © 2026 Takshaya. All Rights Reserved.
      </div>
    </footer>
  );
}