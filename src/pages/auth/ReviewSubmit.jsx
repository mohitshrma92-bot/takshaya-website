import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthButton from "../../components/auth/AuthButton";

import { supabase } from "../../lib/supabaseClient";
import { useOnboarding } from "../../context/OnboardingContext";

import "../../Styles/auth/auth.css";

export default function ReviewSubmit() {
  const navigate = useNavigate();

  const { onboarding } = useOnboarding();

  const [confirmInformation, setConfirmInformation] =
    useState(false);

  const [authorizeVerification, setAuthorizeVerification] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
   * =========================================================
   * DATA
   * =========================================================
   */

  const companyProfile =
    onboarding.companyProfile || {};

  const businessRoles =
    Array.isArray(onboarding.businessRoles)
      ? onboarding.businessRoles
      : [];

  const gst =
    onboarding.gst || {};

  const pan =
    onboarding.pan || {};

  const udyam =
    onboarding.udyam || {};

  const factoryAddresses =
    Array.isArray(onboarding.factoryAddresses)
      ? onboarding.factoryAddresses
      : [];

  const authorizedPerson =
    onboarding.authorizedPerson || {};

  /*
   * =========================================================
   * DISPLAY HELPER
   * =========================================================
   */

  const displayValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      String(value).trim() === ""
    ) {
      return "Not provided";
    }

    return value;
  };

  /*
   * =========================================================
   * SUBMIT
   * =========================================================
   */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !confirmInformation ||
      !authorizeVerification
    ) {
      setError(
        "Please accept both declarations before submitting your application."
      );

      return;
    }

    setSubmitting(true);

    try {
      /*
       * -----------------------------------------------------
       * GET USER
       * -----------------------------------------------------
       */

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error(
          "Your session has expired. Please log in again."
        );
      }

      /*
       * -----------------------------------------------------
       * CHECK EXISTING APPLICATION
       * -----------------------------------------------------
       */

      const {
        data: existingApplication,
        error: existingApplicationError,
      } = await supabase
        .from("verification_applications")
        .select("id, status")
        .eq("user_id", user.id)
        .not(
          "status",
          "in",
          '("REJECTED")'
        )
        .limit(1)
        .maybeSingle();

      if (existingApplicationError) {
        throw existingApplicationError;
      }

      if (existingApplication) {
        throw new Error(
          `You already have a verification application with status: ${existingApplication.status}.`
        );
      }

      /*
       * -----------------------------------------------------
       * SUBMIT APPLICATION
       * -----------------------------------------------------
       */

      const { data: application, error: insertError } =
        await supabase
          .from("verification_applications")
          .insert({
            user_id: user.id,

            status: "PENDING_REVIEW",

            /*
             * COMPANY
             */

            legal_company_name:
              companyProfile.legalCompanyName || null,

            trade_brand_name:
              companyProfile.tradeBrandName || null,

            year_established:
              companyProfile.yearEstablished
                ? Number(
                    companyProfile.yearEstablished
                  )
                : null,

            primary_industry:
              companyProfile.primaryIndustry || null,

            company_size:
              companyProfile.companySize || null,

            company_website:
              companyProfile.companyWebsite || null,

            about_business:
              companyProfile.aboutBusiness || null,

            /*
             * BUSINESS ROLES
             */

            business_roles:
              businessRoles,

            /*
             * GST
             */

            gstin:
              gst.gstin || null,

            gst_status:
              "PENDING",

            /*
             * PAN
             */

            pan_number:
              pan.panNumber || null,

            pan_entity_type:
              pan.category || null,

            pan_status:
              "PENDING",

            /*
             * UDYAM
             */

            udyam_number:
              udyam.udyamNumber || null,

            udyam_status:
              "PENDING",

            /*
             * FACTORY
             */

            factory_addresses:
              factoryAddresses,

            /*
             * AUTHORIZED PERSON
             */

            authorized_person:
              authorizedPerson,

            /*
             * UPLOADED DOCUMENTS (stored privately in Supabase;
             * only the file locations and names are saved here)
             */

            documents: [
              pan?.document?.path
                ? { ...pan.document, kind: "pan" }
                : null,
              authorizedPerson?.governmentId?.path
                ? {
                    ...authorizedPerson.governmentId,
                    kind: "government_id",
                  }
                : null,
              authorizedPerson?.profilePhoto?.path
                ? {
                    ...authorizedPerson.profilePhoto,
                    kind: "profile_photo",
                  }
                : null,
            ].filter(Boolean),

            /*
             * SUBMISSION
             */

            submitted_at:
              new Date().toISOString(),
          })
          .select()
          .single();

      if (insertError) {
        throw insertError;
      }

      /*
       * -----------------------------------------------------
       * LOCAL SUBMISSION STATE
       * -----------------------------------------------------
       */

      localStorage.setItem(
        "takshaya_onboarding_status",
        "submitted"
      );

      if (application?.id) {
        localStorage.setItem(
          "takshaya_application_id",
          application.id
        );
      }

      /*
       * -----------------------------------------------------
       * SUCCESS
       * -----------------------------------------------------
       */

      navigate(
        "/verification-submitted"
      );

    } catch (submitError) {
      console.error(
        "Takshaya application submission failed:",
        submitError
      );

      setError(
        submitError?.message ||
          "Unable to submit your application. Please try again."
      );

    } finally {
      setSubmitting(false);
    }
  };

  /*
   * =========================================================
   * PAGE
   * =========================================================
   */

  return (
    <OnboardingLayout
      step={9}
      left={
        <form onSubmit={handleSubmit}>

          {/* =================================================
              HEADER
          ================================================= */}

          <h2>
            Review & Submit
          </h2>

          <p>
            Review the information provided during
            onboarding before submitting your company
            for verification.
          </p>

          {/* =================================================
              COMPANY INFORMATION
          ================================================= */}

          <div className="review-section">

            <div className="review-section-header">

              <div>
                <h3>
                  Company Information
                </h3>

                <span>
                  Company Profile
                </span>
              </div>

              <button
                type="button"
                className="review-edit-button"
                onClick={() =>
                  navigate(
                    "/company-profile"
                  )
                }
              >
                Edit
              </button>

            </div>

            <div className="review-grid">

              <div className="review-item">
                <span>
                  Legal Company Name
                </span>

                <strong>
                  {displayValue(
                    companyProfile.legalCompanyName
                  )}
                </strong>
              </div>

              <div className="review-item">
                <span>
                  Trade / Brand Name
                </span>

                <strong>
                  {displayValue(
                    companyProfile.tradeBrandName
                  )}
                </strong>
              </div>

              <div className="review-item">
                <span>
                  Year Established
                </span>

                <strong>
                  {displayValue(
                    companyProfile.yearEstablished
                  )}
                </strong>
              </div>

              <div className="review-item">
                <span>
                  Primary Industry
                </span>

                <strong>
                  {displayValue(
                    companyProfile.primaryIndustry
                  )}
                </strong>
              </div>

              <div className="review-item">
                <span>
                  Company Size
                </span>

                <strong>
                  {displayValue(
                    companyProfile.companySize
                  )}
                </strong>
              </div>

              <div className="review-item">
                <span>
                  Website
                </span>

                <strong>
                  {displayValue(
                    companyProfile.companyWebsite
                  )}
                </strong>
              </div>

            </div>

            <div className="review-item">

              <span>
                About Business
              </span>

              <strong>
                {displayValue(
                  companyProfile.aboutBusiness
                )}
              </strong>

            </div>

          </div>

          {/* =================================================
              BUSINESS ROLES
          ================================================= */}

          <div className="review-section">

            <div className="review-section-header">

              <div>
                <h3>
                  Business Roles
                </h3>

                <span>
                  Business Role
                </span>
              </div>

              <button
                type="button"
                className="review-edit-button"
                onClick={() =>
                  navigate(
                    "/business-roles"
                  )
                }
              >
                Edit
              </button>

            </div>

            {businessRoles.length > 0 ? (

              <div className="review-tags">

                {businessRoles.map(
                  (role) => (
                    <span
                      className="review-tag"
                      key={role}
                    >
                      {role}
                    </span>
                  )
                )}

              </div>

            ) : (

              <div className="review-item">

                <strong>
                  No business roles selected
                </strong>

              </div>

            )}

          </div>

          {/* =================================================
              GOVERNMENT VERIFICATION
          ================================================= */}

          <div className="review-section">

            <div className="review-section-header">

              <div>
                <h3>
                  Government Verification
                </h3>

                <span>
                  Business Identity
                </span>
              </div>

            </div>

            <div className="verification-list">

              {/* GST */}

              <div className="verification-row">

                <div>
                  <strong>
                    GST Verification
                  </strong>

                  <span>
                    {gst.gstin
                      ? `GSTIN: ${gst.gstin}`
                      : "GSTIN not provided"}
                  </span>
                </div>

                <div className="pending-badge">
                  • Pending
                </div>

              </div>

              {/* PAN */}

              <div className="verification-row">

                <div>
                  <strong>
                    PAN Verification
                  </strong>

                  <span>
                    {pan.panNumber
                      ? `PAN: ${pan.panNumber}`
                      : "PAN not provided"}
                  </span>
                </div>

                <div className="pending-badge">
                  • Pending
                </div>

              </div>

              {/* UDYAM */}

              <div className="verification-row">

                <div>
                  <strong>
                    UDYAM Verification
                  </strong>

                  <span>
                    {udyam.udyamNumber
                      ? `UDYAM: ${udyam.udyamNumber}`
                      : "UDYAM not provided"}
                  </span>
                </div>

                <div className="pending-badge">
                  • Pending
                </div>

              </div>

            </div>

            <div className="verification-note">

              <strong>
                Manual verification
              </strong>

              <span>
                Government records will be checked
                by the Takshaya verification team
                before approval.
              </span>

            </div>

          </div>

          {/* =================================================
              FACTORY ADDRESS
          ================================================= */}

          <div className="review-section">

            <div className="review-section-header">

              <div>
                <h3>
                  Factory / Operating Location
                </h3>

                <span>
                  Factory Address
                </span>
              </div>

              <button
                type="button"
                className="review-edit-button"
                onClick={() =>
                  navigate(
                    "/factory-address"
                  )
                }
              >
                Edit
              </button>

            </div>

            {factoryAddresses.length > 0 ? (

              factoryAddresses.map(
                (address, index) => (

                  <div
                    className="review-item"
                    key={
                      address.id ||
                      index
                    }
                  >

                    <span>
                      {address.addressType ||
                        `Location ${
                          index + 1
                        }`}
                    </span>

                    <strong>
                      {[
                        address.addressLine1,
                        address.addressLine2,
                        address.city,
                        address.state,
                        address.pinCode,
                        address.country,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </strong>

                  </div>

                )
              )

            ) : (

              <div className="review-item">

                <span>
                  Operating Address
                </span>

                <strong>
                  Address details will appear here
                </strong>

              </div>

            )}

          </div>

          {/* =================================================
              AUTHORIZED PERSON
          ================================================= */}

          <div className="review-section">

            <div className="review-section-header">

              <div>
                <h3>
                  Authorized Representative
                </h3>

                <span>
                  Company Representative
                </span>
              </div>

              <button
                type="button"
                className="review-edit-button"
                onClick={() =>
                  navigate(
                    "/authorized-person"
                  )
                }
              >
                Edit
              </button>

            </div>

            <div className="review-grid">

              <div className="review-item">

                <span>
                  Full Name
                </span>

                <strong>
                  {displayValue(
                    authorizedPerson.fullName
                  )}
                </strong>

              </div>

              <div className="review-item">

                <span>
                  Designation
                </span>

                <strong>
                  {displayValue(
                    authorizedPerson.designation
                  )}
                </strong>

              </div>

              <div className="review-item">

                <span>
                  Business Email
                </span>

                <strong>
                  {displayValue(
                    authorizedPerson.businessEmail
                  )}
                </strong>

              </div>

              <div className="review-item">

                <span>
                  Mobile Number
                </span>

                <strong>
                  {displayValue(
                    authorizedPerson.mobileNumber
                  )}
                </strong>

              </div>

            </div>

            {authorizedPerson.isAuthorized && (

              <div className="authorization-confirmed">
                ✓ Authorized to represent the company
              </div>

            )}

          </div>

          {/* =================================================
              DECLARATIONS
          ================================================= */}

          <div className="review-declarations">

            <label className="declaration-option">

              <input
                type="checkbox"
                checked={
                  confirmInformation
                }
                onChange={(event) => {

                  setConfirmInformation(
                    event.target.checked
                  );

                  setError("");

                }}
              />

              <span>
                I confirm that the information
                provided by my company is accurate
                and complete.
              </span>

            </label>

            <label className="declaration-option">

              <input
                type="checkbox"
                checked={
                  authorizeVerification
                }
                onChange={(event) => {

                  setAuthorizeVerification(
                    event.target.checked
                  );

                  setError("");

                }}
              />

              <span>
                I authorize Takshaya to verify
                the information and documents
                submitted during onboarding.
              </span>

            </label>

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <p
              className="auth-error"
              role="alert"
            >
              {error}
            </p>

          )}

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="button-group">

            <AuthButton
              type="button"
              variant="secondary"
              disabled={submitting}
              onClick={() =>
                navigate(
                  "/authorized-person"
                )
              }
            >
              ← Back
            </AuthButton>

            <AuthButton
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Submit for Verification →"}
            </AuthButton>

          </div>

        </form>
      }
    />
  );
}