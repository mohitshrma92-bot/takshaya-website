export default function Journey() {
  return (
    <section id="journey" className="journey">

      <div className="container">

        <h2>Choose Your Journey</h2>

        <p className="journey-subtitle">
          Whether you're looking for tooling or want to unlock the value of idle moulds and dies, Takshaya connects the right partners.
        </p>

        <div className="journey-grid">

          {/* Manufacturer Card */}

          <div className="journey-card">

            <div className="icon">🏭</div>

            <h3>Manufacturer / Brand</h3>

            <p>
              Looking for moulds, dies or production tooling?
              Submit your requirement and we'll connect you with the right tool owner.
            </p>

            <ul>
              <li>✔ Injection Moulds</li>
              <li>✔ Blow Moulds</li>
              <li>✔ Press Tools</li>
              <li>✔ Die Casting Tools</li>
            </ul>

              <a href="#manufacturer" className="primary">
               Request Tooling
              </a>

          </div>

          {/* Tool Owner Card */}

          <div className="journey-card">

            <div className="icon">🛠</div>

            <h3>Tool Owner / Tool Room</h3>

            <p>
              Have idle tooling? List your moulds and dies to help manufacturers and generate new business opportunities.
            </p>

            <ul>
              <li>✔ List Existing Moulds</li>
              <li>✔ Tool Room Registration</li>
              <li>✔ Machine Capacity</li>
              <li>✔ Manufacturing Expertise</li>
            </ul>

              <a href="#toolowner" className="secondary">
               List My Tool
              </a>

          </div>

        </div>

      </div>

    </section>
  );
}