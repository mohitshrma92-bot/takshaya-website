import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

export default function BusinessRoles() {
  return (
    <AuthLayout
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>Select Your Business Roles</h2>

          <p>
            One company can perform multiple roles on Takshaya.
            Select all that apply.
          </p>

          <div className="roles-grid">

            <div className="role-card">
              <span className="role-icon">🏭</span>
              <h3>Manufacturer</h3>
              <p>Manufacture finished products.</p>
              <input type="checkbox" />
            </div>

            <div className="role-card">
              <span className="role-icon">🛠</span>
              <h3>Tool Owner</h3>
              <p>Own moulds, dies or tools.</p>
              <input type="checkbox" />
            </div>

            <div className="role-card">
              <span className="role-icon">🏢</span>
              <h3>Tool Room</h3>
              <p>Manufacture moulds & dies.</p>
              <input type="checkbox" />
            </div>

            <div className="role-card">
              <span className="role-icon">🏷</span>
              <h3>Brand Owner</h3>
              <p>Own products and outsource manufacturing.</p>
              <input type="checkbox" />
            </div>

          </div>

          <Link to="/business-verification">
          <AuthButton>
            Continue →
          </AuthButton>
        </Link>
        </>
      }

      right={
        <>
          <h2>One Company. Multiple Roles.</h2>

          <p>
            Takshaya allows one verified company to act as
            a Manufacturer, Tool Owner, Tool Room and Brand
            without creating multiple accounts.
          </p>

          <ul className="feature-list">
            <li>✓ One Account</li>
            <li>✓ Multiple Business Roles</li>
            <li>✓ Central Dashboard</li>
            <li>✓ Verified Network</li>
          </ul>
        </>
      }
    />
  );
}