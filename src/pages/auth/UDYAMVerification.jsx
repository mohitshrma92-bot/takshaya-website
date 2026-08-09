import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthButton from "../../components/auth/AuthButton";

import "../../Styles/auth/auth.css";
import "../../Styles/auth/onboarding.css";

export default function UDYAMVerification() {
  const navigate = useNavigate();

  const [udyam, setUdyam] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [udyamData, setUdyamData] = useState(null);

  /* =====================================================
     FORMAT UDYAM
  ===================================================== */

  const formatUDYAM = (value) => {
    let cleaned = value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");

    if (!cleaned.startsWith("UDYAM")) {
      if (cleaned.length > 0) {
        cleaned = "UDYAM" + cleaned;
      }
    }

    cleaned = cleaned.slice(0, 19);

    if (cleaned.length <= 5) {
      return cleaned;
    }

    let formatted = "UDYAM";

    const remaining = cleaned.slice(5);

    if (remaining.length > 0) {
      formatted += "-";
      formatted += remaining.slice(0, 2);
    }

    if (remaining.length > 2) {
      formatted += "-";
      formatted += remaining.slice(2, 4);
    }

    if (remaining.length > 4) {
      formatted += "-";
      formatted += remaining.slice(4, 11);
    }

    return formatted;
  };

  /* =====================================================
     VALIDATE UDYAM
  ===================================================== */

  const isValidUDYAM = (value) => {
    const pattern =
      /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/;

    return pattern.test(value);
  };

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleUDYAMChange = (event) => {
    const formatted = formatUDYAM(event.target.value);

    setUdyam(formatted);
    setError("");

    if (status !== "idle") {
      setStatus("idle");
      setUdyamData(null);
    }
  };

  /* =====================================================
     VERIFY UDYAM
  ===================================================== */

  const handleVerifyUDYAM = () => {
    setError("");

    if (!udyam) {
      setError("Please enter your UDYAM Registration Number.");
      return;
    }

    if (!isValidUDYAM(udyam)) {
      setError(
        "Please enter a valid UDYAM Registration Number."
      );
      return;
    }

    setStatus("verifying");

    /*
      MVP VERIFICATION

      This is currently a simulated verification.

      Later this will be replaced by a secure
      government/API verification service.
    */

    setTimeout(() => {
      setUdyamData({
        number: udyam,
        enterpriseName: "Registered Business",
        status: "Active",
        category: "Micro / Small / Medium Enterprise",
      });

      setStatus("verified");

      localStorage.setItem(
        "takshaya_udyam_verification",
        JSON.stringify({
          udyam: udyam,
          verified: true,
        })
      );
    }, 1000);
  };

  /* =====================================================
     CONTINUE
  ===================================================== */

  const handleContinue = () => {
    if (status !== "verified") {
      setError(
        "Please verify your UDYAM registration before continuing."
      );
      return;
    }

    navigate("/factory-address");
  };

  /* =====================================================
     BACK
  ===================================================== */

  const handleBack = () => {
    navigate("/pan-verification");
  };

  return (
    <OnboardingLayout
      step={6}
      left={
        <div className="onboarding-content">

          {/* HEADER */}

          <div className="onboarding-header">

            <span className="onboarding-eyebrow">
              UDYAM VERIFICATION
            </span>

            <h2>
              Verify Your UDYAM
            </h2>

            <p>
              Verify your UDYAM Registration Number
              to establish your MSME business identity
              on Takshaya.
            </p>

          </div>

          {/* INFORMATION BOX */}

          <div className="verification-info">

            <div className="verification-info-icon">
              ✓
            </div>

            <div>

              <strong>
                Why do we need your UDYAM?
              </strong>

              <p>
                UDYAM verification helps Takshaya
                establish your MSME registration and
                strengthen your verified business profile.
              </p>

            </div>

          </div>

          {/* UDYAM INPUT */}

          <div className="form-field">

            <label htmlFor="udyam">
              UDYAM Registration Number
              <span>*</span>
            </label>

            <input
              id="udyam"
              name="udyam"
              type="text"
              value={udyam}
              onChange={handleUDYAMChange}
              placeholder="UDYAM-XX-00-0000000"
              maxLength={19}
              autoComplete="off"
            />

            <div className="gst-helper">
              Example format:
              <strong> UDYAM-MH-19-0000000</strong>
            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div className="verification-error">
              {error}
            </div>
          )}

          {/* VERIFY */}

          {status !== "verified" && (
            <AuthButton
              type="button"
              disabled={status === "verifying"}
              onClick={handleVerifyUDYAM}
            >
              {status === "verifying"
                ? "Verifying UDYAM..."
                : "Verify UDYAM →"}
            </AuthButton>
          )}

          {/* SUCCESS */}

          {status === "verified" && udyamData && (
            <div className="gst-result">

              <div className="gst-result-header">

                <div>

                  <span className="gst-result-label">
                    UDYAM VERIFICATION
                  </span>

                  <h3>
                    Verification Successful
                  </h3>

                </div>

                <span className="gst-status">
                  ✓ Active
                </span>

              </div>

              <div className="gst-details">

                <div className="gst-detail-item">

                  <span>
                    UDYAM NUMBER
                  </span>

                  <strong>
                    {udyamData.number}
                  </strong>

                </div>

                <div className="gst-detail-item">

                  <span>
                    ENTERPRISE NAME
                  </span>

                  <strong>
                    {udyamData.enterpriseName}
                  </strong>

                </div>

                <div className="gst-detail-item">

                  <span>
                    STATUS
                  </span>

                  <strong>
                    {udyamData.status}
                  </strong>

                </div>

                <div className="gst-detail-item">

                  <span>
                    ENTERPRISE CATEGORY
                  </span>

                  <strong>
                    {udyamData.category}
                  </strong>

                </div>

              </div>

            </div>
          )}

          {/* NAVIGATION */}

          <div className="button-group">

            <AuthButton
              type="button"
              variant="secondary"
              onClick={handleBack}
            >
              ← Back
            </AuthButton>

            <AuthButton
              type="button"
              disabled={status !== "verified"}
              onClick={handleContinue}
            >
              Continue →
            </AuthButton>

          </div>

        </div>
      }

      right={
        <div className="onboarding-right-content">

          <span className="onboarding-right-badge">
            TAKSHAYA
          </span>

          <h1>
            Build a
            <br />
            Verified Business.
          </h1>

          <p>
            A verified business identity helps create
            confidence between manufacturers, brands,
            tooling partners and suppliers across the
            Takshaya ecosystem.
          </p>

          <div className="onboarding-points">

            <div>
              <span>✓</span>
              Verified MSME identity
            </div>

            <div>
              <span>✓</span>
              Stronger company profile
            </div>

            <div>
              <span>✓</span>
              Trusted business relationships
            </div>

            <div>
              <span>✓</span>
              Access to the Takshaya ecosystem
            </div>

          </div>

          <div className="onboarding-trust">

            <strong>
              Verification builds trust.
            </strong>

            <span>
              Your UDYAM information will become
              part of your verified Takshaya business
              profile.
            </span>

          </div>

        </div>
      }
    />
  );
}