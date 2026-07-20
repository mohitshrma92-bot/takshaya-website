export default function ToolOwnerForm() {
  return (
    <section id="toolowner" className="form-section">
      <div className="container">
        <h2>Tool Owner Registration</h2>

        <form
        className="lead-form"
        action="https://formsubmit.co/mohitdsharma99@gmail.com"
        method="POST"
        >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input
        type="hidden"
        name="_subject"
        value="New Tool Owner Registration - Takshaya"
        />
        <input
        type="hidden"
        name="_next"
        value="https://www.takshaya.com/thank-you"
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
        name="Tool Details"
        placeholder="Tell us about your tooling (Moulds, Dies, Press Tools, Machine Capacity, Location, etc.)"
        rows="5"
        required
        ></textarea>
        
        <button className="primary" type="submit">
          Register My Tool
        </button>
      </form>
      </div>
    </section>
  );
}