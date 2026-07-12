import heroImage from "../assets/hero/hero.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(8,25,52,0.82), rgba(8,25,52,0.82)), url(${heroImage})`,
      }}
    >
      <div className="container hero-content">

        <span className="badge">
          🚀 India's Manufacturing Tooling Exchange
        </span>

        <h1>
         Unlock the Value of
         <br />
         Idle Manufacturing
         <br />
         Tooling
        </h1>

        <p className="hero-description">
          Takshaya connects manufacturers, brands, tool rooms and tooling
          owners to reduce tooling costs, unlock idle moulds & dies, and
          accelerate manufacturing across India.
        </p>

        <div className="hero-buttons">
          <a href="#manufacturer" className="primary">
            Find Tooling
          </a>

          <a href="#toolowner" className="secondary">
            List Your Tool
          </a>
        </div>

      </div>
    </section>
  );
}