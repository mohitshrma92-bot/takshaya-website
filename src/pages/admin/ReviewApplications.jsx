import { useCallback, useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import { getKycDocumentUrl } from "../../lib/kycUpload";
import "../../Styles/admin.css";

/*
 * Reviewer-only screen. Only users listed in staff_users (platform_admin or
 * kyc_reviewer) can open it, and the database rules enforce the same thing,
 * so a customer cannot read or change applications even by calling the API.
 */

const STATUS_LABELS = {
  PENDING_REVIEW: "Pending",
  UNDER_REVIEW: "Under review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  SUSPENDED: "Suspended",
};

const FILTERS = [
  "PENDING_REVIEW",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
  "ALL",
];

const DOCUMENT_LABELS = {
  pan: "PAN card",
  government_id: "Government ID",
  profile_photo: "Photo of authorised person",
};

/*
 * The checks a reviewer completes before approving. Required checks must
 * all be ticked before the Approve button works.
 */
const CHECKLIST = [
  {
    key: "gst_active",
    required: true,
    label: "GSTIN is Active on the GST portal",
  },
  {
    key: "pan_valid",
    required: true,
    label: "PAN is valid and its type matches the business type",
  },
  {
    key: "names_match",
    required: true,
    label: "Legal name matches across GST, PAN and Udyam",
  },
  {
    key: "person_id",
    required: true,
    label: "Authorised person's ID matches the name entered",
  },
  {
    key: "contact_reached",
    required: true,
    label: "Reached the company by phone or email",
  },
  {
    key: "udyam_ok",
    required: false,
    label: "Udyam number checked on the Udyam portal",
  },
  {
    key: "mca_ok",
    required: false,
    label: "Company is Active in MCA records (private limited and LLP)",
  },
  {
    key: "address_ok",
    required: false,
    label: "Factory address matches GST address, or proof received",
  },
  {
    key: "ownership_proof",
    required: false,
    label: "Proof of tool ownership received (tool owners)",
  },
];

const REQUIRED_KEYS = CHECKLIST.filter((item) => item.required).map(
  (item) => item.key
);

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "-";

const addressText = (address) =>
  Object.entries(address || {})
    .filter(
      ([key, value]) =>
        key !== "id" && typeof value === "string" && value.trim()
    )
    .map(([, value]) => value.trim())
    .join(", ");

function Field({ label, value }) {
  return (
    <div className="rv-field">
      <span>{label}</span>
      <strong>{value || "-"}</strong>
    </div>
  );
}

export default function ReviewApplications() {
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [filter, setFilter] = useState("PENDING_REVIEW");
  const [selectedId, setSelectedId] = useState(null);

  const [checks, setChecks] = useState({});
  const [notes, setNotes] = useState("");
  const [reason, setReason] = useState("");

  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    const { data, error } = await supabase
      .from("verification_applications")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) {
      setLoadError(
        "Could not load applications. Check that the database setup (001 and 002) has been run and that you are listed as a reviewer."
      );
      setApplications([]);
    } else {
      setApplications(data || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => {
    const result = { ALL: applications.length };
    applications.forEach((application) => {
      result[application.status] = (result[application.status] || 0) + 1;
    });
    return result;
  }, [applications]);

  const visible = useMemo(
    () =>
      filter === "ALL"
        ? applications
        : applications.filter((application) => application.status === filter),
    [applications, filter]
  );

  const selected =
    applications.find((application) => application.id === selectedId) || null;

  const selectApplication = (application) => {
    setSelectedId(application.id);
    setChecks(application.review_checklist || {});
    setNotes(application.review_notes || "");
    setReason(application.rejection_reason || "");
    setMessage({ type: "", text: "" });
  };

  const requiredDone = REQUIRED_KEYS.every((key) => checks[key] === true);

  const save = async (status, successText) => {
    if (!selected || busy) return;

    setBusy(true);
    setMessage({ type: "", text: "" });

    const { data, error } = await supabase
      .from("verification_applications")
      .update({
        status,
        review_checklist: checks,
        review_notes: notes.trim() || null,
        rejection_reason:
          status === "REJECTED" ? reason.trim() : null,
        reviewed_by: user?.id ?? null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", selected.id)
      .select()
      .maybeSingle();

    setBusy(false);

    if (error) {
      setMessage({
        type: "error",
        text: `Could not save: ${error.message}`,
      });
      return;
    }

    // The database returns no row when it refuses the change.
    if (!data) {
      setMessage({
        type: "error",
        text: "Could not save. You may not have reviewer permission.",
      });
      return;
    }

    setApplications((current) =>
      current.map((application) =>
        application.id === data.id ? data : application
      )
    );
    setMessage({ type: "success", text: successText });
  };

  const handleApprove = () => {
    if (!requiredDone) {
      setMessage({
        type: "error",
        text: "Tick all the required checks before approving.",
      });
      return;
    }
    save("APPROVED", "Approved. The company can now use the marketplace.");
  };

  const handleReject = () => {
    if (!reason.trim()) {
      setMessage({
        type: "error",
        text: "Write a reason. The company will see it on their dashboard.",
      });
      return;
    }
    save("REJECTED", "Rejected. The company can see the reason.");
  };

  const handleHold = () => {
    save("UNDER_REVIEW", "Saved. Marked as under review.");
  };

  const openDocument = async (path) => {
    // Open the tab first so the browser does not block it as a popup.
    const tab = window.open("about:blank", "_blank");

    try {
      const url = await getKycDocumentUrl(path);
      if (tab) {
        tab.opener = null;
        tab.location.href = url;
      }
    } catch (error) {
      if (tab) tab.close();
      setMessage({ type: "error", text: error.message });
    }
  };

  const documents = Array.isArray(selected?.documents)
    ? selected.documents
    : [];
  const person = selected?.authorized_person || {};
  const roles = Array.isArray(selected?.business_roles)
    ? selected.business_roles.filter((role) => typeof role === "string")
    : [];
  const addresses = Array.isArray(selected?.factory_addresses)
    ? selected.factory_addresses
    : [];

  return (
    <DashboardLayout>
      <div className="rv-page">
        <h1>Review applications</h1>
        <p className="rv-intro">
          Check each company against the government records, tick the checks,
          then approve or reject. Reasons for rejection are shown to the
          company.
        </p>

        <div className="rv-filters" role="tablist">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item === "ALL" ? "All" : STATUS_LABELS[item]} (
              {counts[item] || 0})
            </button>
          ))}
        </div>

        {loading && <p role="status">Loading applications...</p>}
        {loadError && (
          <p className="rv-message error" role="alert">
            {loadError}
          </p>
        )}

        {!loading && !loadError && (
          <div className="rv-layout">
            <ul className="rv-list">
              {visible.length === 0 && (
                <li className="rv-empty">
                  No applications in this list.
                </li>
              )}

              {visible.map((application) => (
                <li key={application.id}>
                  <button
                    type="button"
                    className={
                      application.id === selectedId ? "selected" : ""
                    }
                    onClick={() => selectApplication(application)}
                  >
                    <strong>
                      {application.legal_company_name || "Unnamed company"}
                    </strong>
                    <span>{formatDate(application.submitted_at)}</span>
                    <em className={`rv-status ${application.status}`}>
                      {STATUS_LABELS[application.status] ||
                        application.status}
                    </em>
                  </button>
                </li>
              ))}
            </ul>

            <section className="rv-detail">
              {!selected && (
                <p className="rv-empty">
                  Select an application to review it.
                </p>
              )}

              {selected && (
                <>
                  <h2>{selected.legal_company_name || "Unnamed company"}</h2>

                  <div className="rv-grid">
                    <Field
                      label="Brand name"
                      value={selected.trade_brand_name}
                    />
                    <Field
                      label="Roles"
                      value={roles.join(", ")}
                    />
                    <Field label="Industry" value={selected.primary_industry} />
                    <Field label="Company size" value={selected.company_size} />
                    <Field
                      label="Year established"
                      value={selected.year_established}
                    />
                    <Field label="Website" value={selected.company_website} />
                  </div>

                  <h3>Registrations</h3>
                  <div className="rv-grid">
                    <Field label="GSTIN" value={selected.gstin} />
                    <Field label="PAN" value={selected.pan_number} />
                    <Field
                      label="PAN type"
                      value={selected.pan_entity_type}
                    />
                    <Field label="Udyam" value={selected.udyam_number} />
                  </div>
                  <p className="rv-hint">
                    The company confirmed these itself. Check each one on the
                    official portal.
                  </p>

                  <h3>Authorised person</h3>
                  <div className="rv-grid">
                    <Field label="Name" value={person.fullName} />
                    <Field label="Designation" value={person.designation} />
                    <Field label="Email" value={person.businessEmail} />
                    <Field label="Mobile" value={person.mobileNumber} />
                  </div>

                  <h3>Factory locations</h3>
                  {addresses.length === 0 && <p>None given.</p>}
                  {addresses.map((address, index) => (
                    <p key={address.id || index} className="rv-address">
                      {addressText(address)}
                    </p>
                  ))}

                  <h3>Documents</h3>
                  {documents.length === 0 && (
                    <p>
                      No documents were uploaded with this application.
                      Ask the company to resubmit.
                    </p>
                  )}
                  <ul className="rv-docs">
                    {documents.map((document) => (
                      <li key={document.path}>
                        <span>
                          {DOCUMENT_LABELS[document.kind] || document.kind}
                          <small> {document.name}</small>
                        </span>
                        <button
                          type="button"
                          onClick={() => openDocument(document.path)}
                        >
                          Open
                        </button>
                      </li>
                    ))}
                  </ul>

                  <h3>Verification checklist</h3>
                  <ul className="rv-checks">
                    {CHECKLIST.map((item) => (
                      <li key={item.key}>
                        <label>
                          <input
                            type="checkbox"
                            checked={checks[item.key] === true}
                            onChange={(event) =>
                              setChecks((current) => ({
                                ...current,
                                [item.key]: event.target.checked,
                              }))
                            }
                          />
                          <span>
                            {item.label}
                            {item.required ? (
                              <small> (required)</small>
                            ) : (
                              <small> (if it applies)</small>
                            )}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>

                  <label className="rv-label" htmlFor="rv-notes">
                    Internal notes (the company cannot see these)
                  </label>
                  <textarea
                    id="rv-notes"
                    rows={3}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                  />

                  <label className="rv-label" htmlFor="rv-reason">
                    Reason for rejection (the company will see this)
                  </label>
                  <textarea
                    id="rv-reason"
                    rows={3}
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="For example: the name on the GST record does not match the PAN."
                  />

                  {message.text && (
                    <p
                      className={`rv-message ${message.type}`}
                      role={message.type === "error" ? "alert" : "status"}
                    >
                      {message.text}
                    </p>
                  )}

                  <div className="rv-actions">
                    <button
                      type="button"
                      className="approve"
                      disabled={busy || !requiredDone}
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="hold"
                      disabled={busy}
                      onClick={handleHold}
                    >
                      Save as under review
                    </button>
                    <button
                      type="button"
                      className="reject"
                      disabled={busy}
                      onClick={handleReject}
                    >
                      Reject
                    </button>
                  </div>
                  {!requiredDone && (
                    <p className="rv-hint">
                      Approve turns on once all required checks are ticked.
                    </p>
                  )}

                  {selected.reviewed_at && (
                    <p className="rv-hint">
                      Last reviewed {formatDate(selected.reviewed_at)}.
                    </p>
                  )}
                </>
              )}
            </section>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
