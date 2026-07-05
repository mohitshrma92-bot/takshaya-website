export default function ManufacturerForm() {
  return (
    <section className="form-section" id="manufacturer">

      <div className="container">

        <h2>Manufacturer / Brand Enquiry</h2>

        <p className="section-subtitle">
          Tell us your tooling requirement and our team will connect you with suitable partners.
        </p>

        <form className="lead-form">

          <input type="text" placeholder="Company Name" />

          <input type="text" placeholder="Contact Person" />

          <input type="email" placeholder="Business Email" />

          <input type="tel" placeholder="Mobile Number" />

          <input type="text" placeholder="Industry" />

          <input type="text" placeholder="Product Name" />

          <select>
            <option>Select Tool Required</option>
            <option>Injection Mould</option>
            <option>Blow Mould</option>
            <option>Press Tool</option>
            <option>Die Casting Tool</option>
          </select>

          <textarea
            rows="5"
            placeholder="Describe your requirement..."
          ></textarea>

          <button className="primary">
            Submit Requirement
          </button>

        </form>

      </div>

    </section>
  );
}