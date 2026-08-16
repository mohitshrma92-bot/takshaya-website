import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../layouts/OnboardingLayout";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/logo/takshaya-logo.png";

import { useOnboarding } from "../context/OnboardingContext";

export default function BusinessRoles() {
  const navigate = useNavigate();

  const {
    onboarding,
    setBusinessRoles,
  } = useOnboarding();

  const existingRoles = Array.isArray(
    onboarding.businessRoles
  )
    ? onboarding.businessRoles
    : [];

  const [primaryRole, setPrimaryRole] = useState(
    existingRoles[0] || ""
  );

  const [capabilities, setCapabilities] = useState(
    existingRoles.slice(1)
  );

  const [error, setError] = useState("");

  const primaryRoles = [
    "Manufacturer",
    "OEM",
    "Brand Owner",
    "Contract Manufacturer",
    "Material Supplier",
    "Service Provider",
  ];

  const capabilityRoles = [
    "Brand / Product Owner",
    "Component Manufacturer",
    "Material Supplier",
    "Tool Room",
    "Mould / Tooling Owner",
    "Machine Builder",
    "Automation Integrator",
  ];

  const handlePrimaryRole = (role) => {
    setPrimaryRole(role);
    setError("");
  };

  const handleCapability = (role) => {
    setError("");

    const alreadySelected =
      capabilities.includes(role);

    if (alreadySelected) {
      setCapabilities((current) =>
        current.filter(
          (item) => item !== role
        )
      );

      return;
    }

    if (capabilities.length >= 2) {
      setError(
        "You can select a maximum of 2 additional capabilities."
      );

      return;
    }

    setCapabilities((current) => [
      ...current,
      role,
    ]);
  };

  const handleContinue = () => {
    setError("");

    if (!primaryRole) {
      setError(
        "Please select your primary business role."
      );

      return;
    }

    const roles = [
      primaryRole,
      ...capabilities,
    ];

    /*
     * SINGLE SOURCE OF TRUTH
     *
     * Save directly into:
     *
     * onboarding.businessRoles
     */

    setBusinessRoles(roles);

    navigate("/company-profile");
  };

  const handleBack = () => {
    navigate("/verify-email");
  };

  return (
    <OnboardingLayout
      step={3}
      left={
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleContinue();
          }}
        >

          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>
            Select Your Business Roles
          </h2>

          <p>
            Tell us what your business does and
            what capabilities you have within the
            manufacturing ecosystem.
          </p>

          {/* PRIMARY ROLE */}

          <div className="role-section">

            <div className="role-section-header">

              <h3>
                1. Primary Business Role
              </h3>

              <p>
                Select the role that best describes
                your business. Choose one.
              </p>

            </div>

            <div className="roles-grid">

              {primaryRoles.map((role) => (

                <label
                  key={role}
                  className={`role-option ${
                    primaryRole === role
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="primary-business-role"
                    value={role}
                    checked={
                      primaryRole === role
                    }
                    onChange={() =>
                      handlePrimaryRole(role)
                    }
                  />

                  <span>
                    {role}
                  </span>

                </label>

              ))}

            </div>

          </div>

          {/* CAPABILITIES */}

          <div className="role-section">

            <div className="role-section-header">

              <h3>
                2. Additional Capabilities
              </h3>

              <p>
                Select up to 2 capabilities that
                your business currently has.
              </p>

            </div>

            <div className="roles-grid">

              {capabilityRoles.map((role) => {

                const selected =
                  capabilities.includes(role);

                const disabled =
                  !selected &&
                  capabilities.length >= 2;

                return (
                  <label
                    key={role}
                    className={`role-option ${
                      selected
                        ? "selected"
                        : ""
                    } ${
                      disabled
                        ? "disabled"
                        : ""
                    }`}
                  >

                    <input
                      type="checkbox"
                      checked={selected}
                      disabled={disabled}
                      onChange={() =>
                        handleCapability(role)
                      }
                    />

                    <span>
                      {role}
                    </span>

                  </label>
                );

              })}

            </div>

            <div className="role-limit-note">
              {capabilities.length}/2
              {" "}
              capabilities selected
            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div
              className="role-validation-error"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* BUTTONS */}

          <div className="button-group">

            <AuthButton
              type="button"
              variant="secondary"
              onClick={handleBack}
            >
              ← Back
            </AuthButton>

            <AuthButton
              type="submit"
            >
              Continue →
            </AuthButton>

          </div>

        </form>
      }
    />
  );
}