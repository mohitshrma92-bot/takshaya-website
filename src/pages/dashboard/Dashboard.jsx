import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { APPLICATION_STATUS, useAuth } from "../../context/AuthContext";

const STATUS_COPY = {
  [APPLICATION_STATUS.PENDING_REVIEW]: {
    label: "Pending review",
    message:
      "Your application has been received. Our team is verifying your business details. Tooling details unlock once you are approved.",
  },
  [APPLICATION_STATUS.UNDER_REVIEW]: {
    label: "Under review",
    message:
      "Our team is reviewing your documents. We will contact you if anything more is needed.",
  },
  [APPLICATION_STATUS.APPROVED]: {
    label: "Verified",
    message:
      "Your business is verified. You can browse the marketplace and raise requests.",
  },
  [APPLICATION_STATUS.REJECTED]: {
    label: "Not approved",
    message:
      "Your application was not approved. See the reason below and contact us to resubmit.",
  },
  [APPLICATION_STATUS.SUSPENDED]: {
    label: "Suspended",
    message:
      "Your account is suspended. Please contact Takshaya support.",
  },
};

const roleLabel = (role) =>
  typeof role === "string"
    ? role
    : role?.label || role?.name || role?.id || "";

export default function Dashboard() {
  const { user, application, applicationLoading, isApproved } = useAuth();

  const companyName =
    application?.legal_company_name ||
    user?.user_metadata?.company_name ||
    "Your company";

  const status = application ? STATUS_COPY[application.status] : null;

  const roles = Array.isArray(application?.business_roles)
    ? application.business_roles.map(roleLabel).filter(Boolean)
    : [];

  return (
    <DashboardLayout>

      <h1>
        Welcome
      </h1>

      <h2>
        {companyName}
      </h2>

      {applicationLoading && (
        <p role="status">Loading your verification status...</p>
      )}

      {!applicationLoading && !application && (
        <div className="dashboard-stat-card">
          <h3>Complete your business verification</h3>
          <p>
            Finish onboarding so our team can verify your company.
            Tooling details are shown only to verified members.
          </p>
          <p>
            <Link to="/business-roles">Continue onboarding</Link>
          </p>
        </div>
      )}

      {!applicationLoading && application && (
        <div className="dashboard-cards">

          <div className="dashboard-stat-card">
            <h3>Verification status</h3>
            <p className="status-value">{status ? status.label : application.status}</p>
            <p>{status ? status.message : ""}</p>
            {application.status === APPLICATION_STATUS.REJECTED &&
              application.rejection_reason && (
                <p>Reason: {application.rejection_reason}</p>
              )}
          </div>

          <div className="dashboard-stat-card">
            <h3>Business roles</h3>
            {roles.length > 0 ? (
              roles.map((role) => <p key={role}>{role}</p>)
            ) : (
              <p>Not set</p>
            )}
          </div>

          {isApproved && (
            <div className="dashboard-stat-card">
              <h3>Get started</h3>
              <p><Link to="/marketplace">Browse the marketplace</Link></p>
              <p><Link to="/rfq/create">Raise a tooling request</Link></p>
            </div>
          )}

        </div>
      )}

    </DashboardLayout>
  );
}
