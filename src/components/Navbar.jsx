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
          <a href="#home">Home</a>
          <a href="#industries">Industries</a>
          <a href="#journey">Journey</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="primary">Early Access</button>

      </div>
    </header>
  );
}