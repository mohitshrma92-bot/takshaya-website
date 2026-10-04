import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useOnboarding } from "../../context/OnboardingContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { resetOnboarding } = useOnboarding();

  const handleLogout = async () => {
    await signOut();
    // Clear saved onboarding details (PAN, GSTIN, mobile) from this browser.
    resetOnboarding();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">

      <h2 className="sidebar-logo">
        TAKSHAYA
      </h2>

      <nav>

        <Link to="/dashboard">🏠 Dashboard</Link>

        <Link to="/marketplace">
          🔍 Marketplace
        </Link>

        <Link to="/rfqs">
          📨 My RFQs
        </Link>

        <Link to="/tool-listings">
          🛠 Tool Listings
        </Link>

        <Link to="/orders">
          📦 Orders
        </Link>

        <Link to="/messages">
          💬 Messages
        </Link>

        <Link to="/company">
          🏢 Company Profile
        </Link>

        <Link to="/settings">
          ⚙ Settings
        </Link>

        <button type="button" onClick={handleLogout}>
          Log out
        </button>

      </nav>

    </aside>
  );
}