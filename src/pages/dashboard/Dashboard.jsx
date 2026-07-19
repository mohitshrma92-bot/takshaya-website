import DashboardLayout from "../../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>

      <h1>
        Welcome Back 👋
      </h1>

      <h2>
        ABC Engineering Pvt Ltd
      </h2>

      <div className="dashboard-cards">

        <div className="stat-card">

          <h3>Trust Score</h3>

          <h1>82</h1>

        </div>

        <div className="stat-card">

          <h3>Profile Completion</h3>

          <h1>92%</h1>

        </div>

        <div className="stat-card">

          <h3>Business Roles</h3>

          <p>Manufacturer</p>

          <p>Tool Owner</p>

        </div>

      </div>

    </DashboardLayout>
  );
}