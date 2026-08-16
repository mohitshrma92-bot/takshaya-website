import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";

import { useOnboarding } from "../../context/OnboardingContext";

export default function PANVerification() {
  const navigate = useNavigate();
  const { onboarding, updateSection } = useOnboarding();

  const [panNumber, setPanNumber] = useState(
    onboarding.pan?.panNumber || ""
  );

  const [entityType, setEntityType] = useState(
    onboarding.pan?.entityType || "Proprietorship"
  );

  const [document, setDocument] = useState(null);
  const [error, setError] = useState("");

  const validatePAN = (value) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
  };

  const handlePANChange = (event) => {
    const value = event.target.value.toUpperCase();

    setPanNumber(value);
    setError("");
  };

  const handleDocumentChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setDocument(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF, JPG, JPEG or PNG file.");
      event.target.value = "";
      setDocument(null);
      return;
    }

    if (file.size > maxSize) {
      setError("PAN document must be smaller than 2 MB.");
      event.target.value = "";
      setDocument(null);
      return;
    }

    setError("");
    setDocument(file);
  };

  const handleContinue = (event) => {
    event.preventDefault();

    const normalizedPAN = panNumber.trim().toUpperCase();

    if (!normalizedPAN) {
      setError("Please enter your PAN number.");
      return;
    }

    if (!validatePAN(normalizedPAN)) {
      setError(
        "Please enter a valid 10-character PAN number."
      );
      return;
    }

    if (!document) {
      setError("Please upload your PAN document.");
      return;
    }

    /*
      ₹0 MVP MANUAL VERIFICATION

      We are NOT connecting to a paid PAN verification API.

      The PAN details and document are recorded as
      "pending" and will be manually reviewed by the
      Takshaya verification team from the backend.
    */

    updateSection("pan", {
      panNumber: normalizedPAN,
      entityType,
      verified: false,
      status: "pending",
      holderName: "",
      category: entityType,
      documentName: document.name,
      documentType: document.type,
      documentSize: document.size,
    });

    navigate("/udyam-verification");
  };

  return (
    <OnboardingLayout
      step={6}
      left={
        <form onSubmit={handleContinue}>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <div className="verification-eyebrow">
            BUSINESS VERIFICATION
          </div>

          <h2>PAN Verification</h2>

          <p>
            Provide your company's PAN details and supporting
            document for Takshaya's manual verification process.
          </p>

          <AuthInput
            label="Company PAN Number"
            value={panNumber}
            onChange={handlePANChange}
            placeholder="ABCDE1234F"
            maxLength={10}
            required
          />

          <p className="auth-helper">
            Enter the 10-character PAN registered against your
            business.
          </p>

          <label className="auth-label">
            Business Entity <span>*</span>
          </label>

          <select
            className="auth-select"
            value={entityType}
            onChange={(event) => {
              setEntityType(event.target.value);
              setError("");
            }}
            required
          >
            <option value="Private Limited">
              Private Limited
            </option>

            <option value="LLP">
              LLP
            </option>

            <option value="Partnership">
              Partnership
            </option>

            <option value="Proprietorship">
              Proprietorship
            </option>

            <option value="Public Limited">
              Public Limited
            </option>

            <option value="One Person Company (OPC)">
              One Person Company (OPC)
            </option>
          </select>

          <label className="auth-label">
            PAN Document <span>*</span>
          </label>

          <div className="upload-box">
            <h4>Upload PAN Document</h4>

            <p>
              Upload a clear copy of the company / proprietor
              PAN card.
            </p>

            <span className="upload-helper">
              PDF, JPG, JPEG or PNG • Maximum 2 MB
            </span>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleDocumentChange}
            />

            {document && (
              <div className="uploaded-file">
                <span>
                  {document.name}
                </span>

                <button
                  type="button"
                  className="text-button"
                  onClick={() => setDocument(null)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <div className="manual-verification-info">
            <strong>Manual Verification</strong>

            <p>
              Your PAN details and document will be reviewed
              by the Takshaya verification team. You can
              continue with onboarding while verification is
              pending.
            </p>

            <span>
              Status: Pending Manual Verification
            </span>
          </div>

          <AuthButton type="submit">
            Continue →
          </AuthButton>

          <div className="auth-back">
            <button
              type="button"
              className="text-button"
              onClick={() => navigate("/gst-verification")}
            >
              ← Back
            </button>
          </div>

          <div className="verification-help-box">
            <h4>Why do we collect PAN?</h4>

            <p>
              PAN helps Takshaya confirm the identity and legal
              structure of the registered business during the
              verification process.
            </p>
          </div>
        </form>
      }
    />
  );
}