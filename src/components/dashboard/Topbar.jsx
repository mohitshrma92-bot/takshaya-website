import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user, application } = useAuth();

  const companyName =
    application?.legal_company_name ||
    user?.user_metadata?.company_name ||
    "Your company";

  return (
    <header className="topbar">

      <input
        type="text"
        placeholder="Search tools, RFQs..."
        className="search-box"
      />

      <div className="topbar-right">

        🔔

        💬

        <div className="company-chip">

          <div className="company-avatar">
            {companyName.charAt(0).toUpperCase()}
          </div>

          <span>
            {companyName}
          </span>

        </div>

      </div>

    </header>
  );
}