export default function ToolOwnerForm() {
  return (
    <section className="form-section">
      <div className="container">
        <h2>Tool Owner Registration</h2>

        <form className="lead-form">

          <input placeholder="Company Name" />

          <input placeholder="Contact Person" />

          <input placeholder="Business Email" />

          <input placeholder="Mobile Number" />

          <textarea
            placeholder="Tell us about your tooling"
            rows="5"
          ></textarea>

          <button className="primary">
            Register Tool
          </button>

        </form>
      </div>
    </section>
  );
}