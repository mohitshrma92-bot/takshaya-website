export default function ManufacturerForm() {
  return (
    <section id="manufacturer" className="form-section">
      <div className="container">
        <h2>Manufacturer / Brand Enquiry</h2>

        <form
        className="lead-form"
        action="https://formsubmit.co/mohitdsharma99@gmail.com"
        method="POST"
        >
          
          {/* Hidden Settings */}
          <input type="hidden" name="_captcha" value="false" />
          <input
          type="hidden"
          name="_subject"
          value="New Manufacturer Enquiry - Takshaya"
          />
          <input type="hidden" name="_template" value="table" />
          
          <input
          type="text"
          name="Company Name"
          placeholder="Company Name"
          required
          />
          
          <input
          type="text"
          name="Contact Person"
          placeholder="Contact Person"
          required
          />
          
          <input
          type="email"
          name="Business Email"
          placeholder="Business Email"
          required
          />
          
          <input
          type="tel"
          name="Mobile Number"
          placeholder="Mobile Number"
          required
          />
          
          <textarea
            name="Tooling Requirement"
            placeholder="Describe your tooling requirement"
            rows="5"
            required
          ></textarea>
          
          <button className="primary" type="submit">
            Submit Requirement
            </button>
          </form>
      </div>
    </section>
  );
}