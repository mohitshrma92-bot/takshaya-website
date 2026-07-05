export default function ManufacturerForm() {
  return (
    <section className="form-section">
      <div className="container">
        <h2>Manufacturer / Brand Enquiry</h2>

        <form className="lead-form">

          <input placeholder="Company Name" />

          <input placeholder="Contact Person" />

          <input placeholder="Business Email" />

          <input placeholder="Mobile Number" />

          <textarea
            placeholder="Describe your tooling requirement"
            rows="5"
          ></textarea>

          <button className="primary">
            Submit Requirement
          </button>

        </form>
      </div>
    </section>
  );
}