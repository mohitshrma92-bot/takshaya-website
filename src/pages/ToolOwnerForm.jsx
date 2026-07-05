export default function ToolOwnerForm() {
  return (
    <section className="form-section" id="toolowner">

      <div className="container">

        <h2>Tool Owner / Tool Room Registration</h2>

        <p className="section-subtitle">
          Register your moulds and dies to reach manufacturers across India.
        </p>

        <form className="lead-form">

          <input type="text" placeholder="Company Name" />

          <input type="text" placeholder="Contact Person" />

          <input type="email" placeholder="Business Email" />

          <input type="tel" placeholder="Mobile Number" />

          <input type="text" placeholder="City" />

          <input type="text" placeholder="State" />

          <input type="number" placeholder="Number of Tools" />

          <input type="text" placeholder="Machine Capacity" />

          <textarea
            rows="5"
            placeholder="Tell us about your tooling..."
          ></textarea>

          <button className="primary">
            Register Tooling
          </button>

        </form>

      </div>

    </section>
  );
}