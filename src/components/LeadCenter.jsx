export default function LeadCenter() {
  return (
    <section className="lead-center">

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

            <button className="primary">
              Request Tooling
            </button>

          </div>

          <div className="lead-card">

            <div className="lead-icon">🛠</div>

            <h3>Tool Owner / Tool Room</h3>

            <p>
              Own moulds or dies?
              List your available tooling and reach manufacturers across India.
            </p>

            <button className="secondary">
              List My Tool
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}