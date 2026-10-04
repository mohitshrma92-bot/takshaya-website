import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

/*
 * Wraps a page so only signed-in users can open it.
 *
 * requireApproved: also require the company's KYC application to be
 * APPROVED (used for the marketplace and RFQs). Unapproved users are
 * sent to the dashboard, which shows their verification status.
 *
 * This only controls what the browser shows. The real protection is the
 * row-level security in supabase/migrations, which is enforced by the
 * database itself.
 */
export default function ProtectedRoute({ children, requireApproved = false }) {
  const { session, loading, applicationLoading, isApproved } = useAuth();
  const location = useLocation();

  if (loading || (session && requireApproved && applicationLoading)) {
    return (
      <div role="status" style={{ padding: "48px", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (requireApproved && !isApproved) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
