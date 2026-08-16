import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthButton from "../../components/auth/AuthButton";

import { useOnboarding } from "../../context/OnboardingContext";

import "../../Styles/auth/auth.css";
import "../../Styles/auth/onboarding.css";

export default function UDYAMVerification() {
  const navigate = useNavigate();

  const {
    onboarding,
    updateSection,
  } = useOnboarding();

  /*
   * =========================================================
   * EXISTING UDYAM DATA
   * =========================================================
   */

  const existingUdyam =
    onboarding?.udyam?.udyamNumber || "";

  const [udyam, setUdyam] =
    useState(existingUdyam);

  const [status, setStatus] =
    useState(
      onboarding?.udyam?.verified
        ? "verified"
        : existingUdyam
        ? "pending"
        : "idle"
    );

  const [error, setError] =
    useState("");

  /*
   * =========================================================
   * FORMAT UDYAM
   * =========================================================
   */

  const formatUDYAM = (value) => {
    let cleaned = value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");

    /*
     * Always make sure UDYAM prefix exists.
     */

    if (!cleaned.startsWith("UDYAM")) {
      cleaned =
        "UDYAM" + cleaned;
    }

    /*
     * Remove duplicated UDYAM prefixes.
     */

    cleaned = cleaned.replace(
      /^UDYAMUDYAM/,
      "UDYAM"
    );

    /*
     * Maximum raw length:
     *
     * UDYAM
     * + 2 state
     * + 2 year
     * + 7 number
     *
     * = 16 characters excluding hyphens
     */

    cleaned =
      cleaned.slice(0, 16);

    /*
     * If only UDYAM has been entered.
     */

    if (cleaned.length <= 5) {
      return cleaned;
    }

    const remaining =
      cleaned.slice(5);

    let formatted =
      "UDYAM";

    /*
     * STATE
     */

    if (remaining.length > 0) {
      formatted +=
        "-" +
        remaining.slice(0, 2);
    }

    /*
     * YEAR
     */

    if (remaining.length > 2) {
      formatted +=
        "-" +
        remaining.slice(2, 4);
    }

    /*
     * REGISTRATION NUMBER
     */

    if (remaining.length > 4) {
      formatted +=
        "-" +
        remaining.slice(4, 11);
    }

    return formatted;
  };

  /*
   * =========================================================
   * VALIDATE UDYAM
   * =========================================================
   */

  const isValidUDYAM = (value) => {
    return /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/.test(
      value
    );
  };

  /*
   * =========================================================
   * INPUT CHANGE
   * =========================================================
   */

  const handleUDYAMChange = (
    event
  ) => {
    const formatted =
      formatUDYAM(
        event.target.value
      );

    setUdyam(formatted);
    setError("");

    /*
     * Once user edits the number,
     * verification must return to pending.
     */

    if (
      status === "verified" ||
      status === "pending"
    ) {
      setStatus("idle");
    }
  };

  /*
   * =========================================================
   * SUBMIT UDYAM FOR MANUAL VERIFICATION
   * =========================================================
   */

  const handleVerifyUDYAM = () => {
    setError("");

    /*
     * REQUIRED
     */

    if (!udyam) {
      setError(
        "Please enter your UDYAM Registration Number."
      );

      return;
    }

    /*
     * FORMAT VALIDATION
     */

    if (!isValidUDYAM(udyam)) {
      setError(
        "Please enter a valid UDYAM Registration Number."
      );

      return;
    }

    /*
     * -------------------------------------------------------
     * MANUAL VERIFICATION
     * -------------------------------------------------------
     *
     * We are NOT claiming government/API verification.
     *
     * The UDYAM number is simply submitted to Takshaya
     * for manual verification.
     */

    updateSection(
      "udyam",
      {
        udyamNumber: udyam,

        verified: false,

        enterpriseName: "",

        status:
          "Pending Verification",

        enterpriseCategory: "",
      }
    );

    /*
     * Save local backup as well.
     */

    localStorage.setItem(
      "takshaya_udyam_verification",
      JSON.stringify({
        udyamNumber: udyam,

        verified: false,

        verificationMethod:
          "Manual Review",

        status:
          "Pending Verification",
      })
    );

    /*
     * Show pending state.
     */

    setStatus("pending");
  };

  /*
   * =========================================================
   * CONTINUE
   * =========================================================
   */

  const handleContinue = () => {
    /*
     * UDYAM must have been submitted.
     */

    if (!isValidUDYAM(udyam)) {
      setError(
        "Please enter and submit your UDYAM Registration Number before continuing."
      );

      return;
    }

    /*
     * Make absolutely sure context
     * contains the UDYAM number.
     */

    updateSection(
      "udyam",
      {
        udyamNumber: udyam,

        verified: false,

        status:
          "Pending Verification",
      }
    );

    navigate(
      "/factory-address"
    );
  };

  /*
   * =========================================================
   * BACK
   * =========================================================
   */

  const handleBack = () => {
    navigate(
      "/pan-verification"
    );
  };

  /*
   * =========================================================
   * PAGE
   * =========================================================
   */

  return (
    <OnboardingLayout
      step={6}
      left={
        <div className="onboarding-content">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="onboarding-header">

            <span className="onboarding-eyebrow">
              UDYAM VERIFICATION
            </span>

            <h2>
              UDYAM Verification
            </h2>

            <p>
              Enter your UDYAM Registration Number.
              Takshaya will manually verify your
              registration before approving your
              business.
            </p>

          </div>

          {/* =================================================
              MANUAL VERIFICATION INFORMATION
          ================================================= */}

          <div className="verification-info">

            <div className="verification-info-icon">
              i
            </div>

            <div>

              <strong>
                Manual Verification
              </strong>

              <p>
                Your UDYAM Registration Number
                will be checked manually by the
                Takshaya team against official
                government records.
              </p>

            </div>

          </div>

          {/* =================================================
              UDYAM INPUT
          ================================================= */}

          <div className="form-field">

            <label htmlFor="udyam">

              UDYAM Registration Number

              <span>
                *
              </span>

            </label>

            <input
              id="udyam"
              name="udyam"
              type="text"
              value={udyam}
              onChange={
                handleUDYAMChange
              }
              placeholder="UDYAM-XX-00-0000000"
              maxLength={19}
              autoComplete="off"
            />

            <div className="gst-helper">

              Example format:

              <strong>
                {" "}
                UDYAM-MH-19-0000000
              </strong>

            </div>

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className="verification-error"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* =================================================
              SUBMIT FOR MANUAL VERIFICATION
          ================================================= */}

          {status !== "pending" && (
            <AuthButton
              type="button"
              onClick={
                handleVerifyUDYAM
              }
            >
              Submit for Manual Verification →
            </AuthButton>
          )}

          {/* =================================================
              PENDING RESULT
          ================================================= */}

          {status === "pending" && (

            <div className="gst-result">

              <div className="gst-result-header">

                <div>

                  <span className="gst-result-label">
                    UDYAM VERIFICATION
                  </span>

                  <h3>
                    Manual Verification Pending
                  </h3>

                </div>

                <span className="gst-status">
                  Pending
                </span>

              </div>

              <div className="gst-details">

                <div className="gst-detail-item">

                  <span>
                    UDYAM NUMBER
                  </span>

                  <strong>
                    {udyam}
                  </strong>

                </div>

                <div className="gst-detail-item">

                  <span>
                    VERIFICATION METHOD
                  </span>

                  <strong>
                    Manual Review
                  </strong>

                </div>

                <div className="gst-detail-item">

                  <span>
                    CURRENT STATUS
                  </span>

                  <strong>
                    Pending Verification
                  </strong>

                </div>

              </div>

              <p
                style={{
                  marginTop:
                    "14px",
                }}
              >
                Your UDYAM number has been
                submitted. The Takshaya team
                will verify it manually before
                final business approval.
              </p>

            </div>
          )}

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="button-group">

            <AuthButton
              type="button"
              variant="secondary"
              onClick={
                handleBack
              }
            >
              ← Back
            </AuthButton>

            <AuthButton
              type="button"
              disabled={
                !isValidUDYAM(
                  udyam
                )
              }
              onClick={
                handleContinue
              }
            >
              Continue →
            </AuthButton>

          </div>

        </div>
      }
    />
  );
}