import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../layouts/OnboardingLayout";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

export default function BusinessRoles() {
  const navigate = useNavigate();

  const roles = [
    "Manufacturer",
    "Tool Room",
    "Mould Owner",
    "Die Owner",
    "OEM",
    "Brand Owner",
    "Contract Manufacturer",
    "Machine Builder",
    "Automation Integrator",
    "Material Supplier",
    "Service Provider",
  ];

  return (
    <OnboardingLayout
      step={3}
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>Select Your Business Roles</h2>

          <p>
            Choose all roles that apply to your business.
          </p>

          <div className="roles-grid">
            {roles.map((role) => (
              <label key={role} className="role-option">
                <input type="checkbox" />
                <span>{role}</span>
              </label>
            ))}
          </div>

          <div className="button-group">

            <AuthButton
              variant="secondary"
              onClick={() => navigate("/company-profile")}
            >
              ← Back
            </AuthButton>

            <AuthButton
              onClick={() => navigate("/gst-verification")}
            >
              Continue →
            </AuthButton>

          </div>
        </>
      }
    />
  );
}