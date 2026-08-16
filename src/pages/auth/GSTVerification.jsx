import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import { useOnboarding } from "../../context/OnboardingContext";

import "../../Styles/auth/onboarding.css";

const GST_PORTAL_URL =
  "https://services.gst.gov.in/services/quicklinks/searchtxp";

export default function GSTVerification() {
  const navigate = useNavigate();
  const { onboarding, updateSection } = useOnboarding();

  const savedGST = onboarding.gst || {};

  const [gstin, setGstin] = useState(savedGST.gstin || "");

  const [portalOpened, setPortalOpened] = useState(
    savedGST.verificationMethod ===
      "official_portal_user_verified"
  );

  const [verified, setVerified] = useState(
    savedGST.verified || false
  );

  const [confirmation, setConfirmation] = useState(false);

  const [checking, setChecking] = useState(false);

  const [error, setError] = useState("");

  const [gstDetails, setGstDetails] = useState({
    legalName: savedGST.legalName || "",
    taxpayerType: savedGST.taxpayerType || "",
    state: savedGST.state || "",
    registeredAddress:
      savedGST.registeredAddress || "",
  });

  const formatGSTIN = (value) => {
    return value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 15);
  };

  const validateGSTIN = (value) => {
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(
      value
    );
  };

  const handleGSTINChange = (event) => {
    const value = formatGSTIN(event.target.value);

    setGstin(value);
    setPortalOpened(false);
    setVerified(false);
    setConfirmation(false);
    setError("");

    updateSection("gst", {
      gstin: value,
      verified: false,
      verificationMethod: "",
      verifiedAt: null,
    });
  };

  const handleOpenGSTPortal = () => {
    setError("");

    if (!gstin) {
      setError("Please enter your GSTIN.");
      return;
    }

    if (gstin.length !== 15) {
      setError("GSTIN must contain exactly 15 characters.");
      return;
    }

    if (!validateGSTIN(gstin)) {
      setError("Please enter a valid GSTIN format.");
      return;
    }

    /*
     * Open the official GST taxpayer search.
     *
     * We deliberately do not scrape or automate the GST
     * website. The user performs the official lookup.
     */
    window.open(
      GST_PORTAL_URL,
      "_blank",
      "noopener,noreferrer"
    );

    setPortalOpened(true);

    updateSection("gst", {
      gstin,
      verificationMethod: "official_portal_pending",
      verified: false,
    });
  };

  const handleConfirmVerification = () => {
    setError("");

    if (!portalOpened) {
      setError(
        "Please open the official GST portal and verify your GSTIN first."
      );
      return;
    }

    if (!confirmation) {
      setError(
        "Please confirm that the GST details match your business."
      );
      return;
    }

    setChecking(true);

    /*
     * This is user-assisted verification for the ₹0 MVP.
     *
     * No government API is being falsely represented here.
     */
    setTimeout(() => {
      const verifiedAt = new Date().toISOString();

      setVerified(true);
      setChecking(false);

      updateSection("gst", {
        gstin,
        verified: true,
        verificationMethod:
          "official_portal_user_verified",
        verifiedAt,

        /*
         * These fields remain blank until we connect
         * an actual GST API.
         */
        legalName: gstDetails.legalName,
        taxpayerType: gstDetails.taxpayerType,
        state: gstDetails.state,
        registeredAddress:
          gstDetails.registeredAddress,
      });
    }, 500);
  };

  const handleContinue = () => {
    if (!verified) {
      setError(
        "GST verification is compulsory. Please complete GST verification before continuing."
      );
      return;
    }

    navigate("/pan-verification");
  };

  const handleBack = () => {
    navigate("/company-profile");
  };

  return (
    <OnboardingLayout
      step={4}
      left={
        <div className="onboarding-content">

          <div className="onboarding-header">

            <span className="onboarding-eyebrow">
              BUSINESS VERIFICATION
            </span>

            <h2>
              GST Verification
            </h2>

            <p>
              Verify your company's GST registration before
              continuing with the Takshaya onboarding process.
            </p>

          </div>

          <div className="company-profile-form">

            {/* GSTIN */}

            <div className="form-field">

              <label htmlFor="gstin">
                GSTIN
                <span>*</span>
              </label>

              <AuthInput
                id="gstin"
                value={gstin}
                onChange={handleGSTINChange}
                placeholder="27ABCDE1234F1Z5"
                maxLength={15}
                autoComplete="off"
              />

              <div className="input-helper">
                Enter your 15-character GST Identification
                Number.
              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div
                className="form-error"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* PORTAL STEP */}

            {!verified && (
              <div className="gst-verification-step">

                <h3>
                  Step 1 — Check GSTIN on the official portal
                </h3>

                <p>
                  Open the official GST Search Taxpayer
                  service and confirm that the GSTIN belongs
                  to your business.
                </p>

                <AuthButton
                  type="button"
                  onClick={handleOpenGSTPortal}
                >
                  Verify on Official GST Portal →
                </AuthButton>

              </div>
            )}

            {/* CONFIRMATION */}

            {portalOpened && !verified && (
              <div className="gst-confirmation">

                <h3>
                  Step 2 — Confirm your GST details
                </h3>

                <p>
                  After checking the official GST portal,
                  confirm that the information belongs to
                  your business.
                </p>

                <label className="gst-confirmation-option">

                  <input
                    type="checkbox"
                    checked={confirmation}
                    onChange={(event) =>
                      setConfirmation(
                        event.target.checked
                      )
                    }
                  />

                  <span>
                    I confirm that I checked the official GST
                    portal and the GSTIN belongs to my business.
                  </span>

                </label>

                <AuthButton
                  type="button"
                  onClick={handleConfirmVerification}
                  disabled={
                    !confirmation || checking
                  }
                >
                  {checking
                    ? "Confirming..."
                    : "Confirm GST Verification ✓"}
                </AuthButton>

              </div>
            )}

            {/* VERIFIED */}

            {verified && (
              <div className="gst-verification-success">

                <strong>
                  ✓ GST Verification Completed
                </strong>

                <p>
                  GSTIN:
                  <strong> {gstin}</strong>
                </p>

                <p>
                  Verification method:
                  <strong>
                    {" "}
                    Official GST Portal
                  </strong>
                </p>

                <div className="gst-confirmed-note">
                  Your GST verification has been recorded.
                </div>

              </div>
            )}

            {/* CONTINUE */}

            {verified && (
              <AuthButton
                type="button"
                onClick={handleContinue}
              >
                Continue to PAN Verification →
              </AuthButton>
            )}

            {/* BACK */}

            <div className="button-group">

              <AuthButton
                type="button"
                variant="secondary"
                onClick={handleBack}
              >
                ← Back
              </AuthButton>

            </div>

          </div>

          <div className="gst-verification-note">

            <strong>
              Why do we verify GST?
            </strong>

            <p>
              GST verification helps Takshaya confirm the
              business identity provided during registration
              and reduce incorrect business registrations.
            </p>

          </div>

        </div>
      }
    />
  );
}