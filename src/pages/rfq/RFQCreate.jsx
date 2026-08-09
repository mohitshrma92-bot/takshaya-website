import DashboardLayout from "../../layouts/DashboardLayout";
import "../../Styles/rfq.css";

export default function RFQCreate() {
  return (
    <DashboardLayout>

      <div className="rfq-page">

        <h1>Create Manufacturing Requirement</h1>

        <p>
          Tell us what tooling you're looking for.
          Takshaya will match your requirement with verified tool owners.
        </p>

        <form className="rfq-form">

          <input
            placeholder="Product Name"
          />

          <select>

            <option>Industry</option>

            <option>Automotive</option>

            <option>Packaging</option>

            <option>Medical</option>

            <option>Consumer Goods</option>

          </select>

          <select>

            <option>Tool Type</option>

            <option>Injection Mould</option>

            <option>Blow Mould</option>

            <option>Press Tool</option>

            <option>Die Casting Tool</option>

          </select>

          <input
            placeholder="Required Quantity"
          />

          <input
            placeholder="Expected Annual Volume"
          />

          <input
            placeholder="Preferred Manufacturing State"
          />

          <textarea
            rows="6"
            placeholder="Describe your tooling requirement..."
          ></textarea>

          <button>

            Submit RFQ

          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}