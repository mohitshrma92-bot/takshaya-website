import logo from "../assets/logo/takshaya-logo.png";

export default function Footer() {
  return (
    <footer id="contact" className="footer">
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
          <a href="#home">Home</a>
          <a href="#journey">Journey</a>
          <a href="#contact">Contact</a>
        </div>

        <p>
          © 2026 Takshaya. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}