import DashboardLayout from "../../layouts/DashboardLayout";
import "../../Styles/tool-details.css";

export default function ToolDetails() {
  return (
    <DashboardLayout>

      <div className="tool-details">

        <div className="tool-gallery">

          <img
            src="https://placehold.co/900x500/e8eef6/0E2340?text=Injection+Mould"
            alt=""
          />

        </div>

        <div className="tool-info">

          <span className="badge">
            VERIFIED TOOL
          </span>

          <h1>
            Automotive Injection Mould
          </h1>

          <p className="company">

            ABC Tool Room Pvt Ltd

          </p>

          <div className="spec-grid">

            <div>

              <strong>Industry</strong>

              Automotive

            </div>

            <div>

              <strong>Cavity</strong>

              4

            </div>

            <div>

              <strong>Tonnage</strong>

              650 Ton

            </div>

            <div>

              <strong>Tool Life</strong>

              500,000 Shots

            </div>

            <div>

              <strong>Material</strong>

              H13 Steel

            </div>

            <div>

              <strong>Availability</strong>

              Available

            </div>

          </div>

          <h3>Description</h3>

          <p>

            High precision automotive injection mould suitable
            for mass production of plastic components with
            excellent surface finish and dimensional accuracy.

          </p>

          <div className="detail-buttons">

            <button className="primary-btn">

              Send Enquiry

            </button>

            <button className="secondary-btn">

              Save Tool

            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}