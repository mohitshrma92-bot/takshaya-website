import { Link } from "react-router-dom";
import logo from "../assets/logo/takshaya-logo.png";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav">

        <Link to="/">
          <img
            src={logo}
            alt="Takshaya"
            className="logo"
          />
        </Link>

        <nav>
          <a href="#home">Home</a>
          <a href="#industries">Industries</a>
          <a href="#journey">Journey</a>
          <a href="#manufacturer">Contact</a>
        </nav>

        <div className="nav-actions">

          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/signup">
            <button className="nav-signup">
              Sign Up
            </button>
          </Link>

        </div>

      </div>
    </header>
  );
}