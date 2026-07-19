export default function Topbar() {
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
            T
          </div>

          <span>
            ABC Engineering Pvt Ltd
          </span>

        </div>

      </div>

    </header>
  );
}