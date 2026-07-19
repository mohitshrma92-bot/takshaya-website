import { Link } from "react-router-dom";

export default function Sidebar() {
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

      </nav>

    </aside>
  );
}