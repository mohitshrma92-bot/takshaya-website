import logo from "../assets/logo/takshaya-logo.png";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav">

        <img
          src={logo}
          alt="Takshaya"
          className="logo"
        />

        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Solutions</a>
          <a href="#">Contact</a>
        </nav>

        <button>Early Access</button>

      </div>
    </header>
  );
}