import logo from "../assets/logo/takshaya-logo.png";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav">

        <a href="#home">
         <img
         src={logo}
         alt="Takshaya"
         className="logo"
        />
       </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#industries">Industries</a>
          <a href="#journey">Journey</a>
          <a href="#manufacturer">Contact</a>
        </nav>

        <a href="#join" className="nav-btn">
         Early Access
        </a>

      </div>
    </header>
  );
}