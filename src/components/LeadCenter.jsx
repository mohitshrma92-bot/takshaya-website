export default function LeadCenter() {
  return (
    <section id="join" className="lead-center">

      <div className="container">

        <h2>Join Takshaya</h2>

        <p className="section-subtitle">
          Choose how you want to be part of India's Manufacturing Tooling Exchange.
        </p>

        <div className="lead-grid">

          <div className="lead-card">

            <div className="lead-icon">🏭</div>

            <h3>Manufacturer / Brand</h3>

            <p>
              Looking for moulds, dies or production tooling?
              Submit your requirement and we'll connect you with verified partners.
            </p>

            <a href="#manufacturer" className="primary">
              Request Tooling
            </a>

          </div>

          <div className="lead-card">

            <div className="lead-icon">🛠</div>

            <h3>Tool Owner / Tool Room</h3>

            <p>
              Own moulds or dies?
              List your available tooling and reach manufacturers across India.
            </p>

            <a href="#toolowner" className="secondary">
              List My Tool
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}