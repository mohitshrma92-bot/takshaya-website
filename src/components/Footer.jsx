import logo from "../assets/logo/takshaya-logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <img
          src={logo}
          alt="Takshaya"
          className="footer-logo"
        />

        <p>
          Building India's Manufacturing Backbone
        </p>

        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Solutions</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        <p>
          © 2026 Takshaya. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}