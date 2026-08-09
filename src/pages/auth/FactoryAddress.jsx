import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthButton from "../../components/auth/AuthButton";

import "../../Styles/auth/auth.css";
import "../../Styles/auth/onboarding.css";

export default function FactoryAddress() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    addressType: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
    country: "India",
    ownership: "",
    operationsAtLocation: "",
    primaryFacility: "",
  });

  const [error, setError] = useState("");

  const states = [
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Other",
  ];

  const addressTypes = [
    "Factory",
    "Manufacturing Unit",
    "Tool Room",
    "Warehouse",
    "Registered Office",
    "Multiple Locations",
  ];

  const ownershipOptions = [
    "Owned",
    "Leased / Rented",
    "Shared",
    "Customer Premises",
  ];

  const operationalLocations = [
    "Factory",
    "Manufacturing Unit",
    "Tool Room",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handlePinChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setForm((current) => ({
      ...current,
      pinCode: value,
    }));

    setError("");
  };

  const validateForm = () => {
    if (!form.addressType) {
      return "Please select the location type.";
    }

    if (!form.addressLine1.trim()) {
      return "Please enter Address Line 1.";
    }

    if (form.addressLine1.trim().length < 5) {
      return "Please enter a complete Address Line 1.";
    }

    if (!form.city.trim()) {
      return "Please enter the city.";
    }

    if (!/^[A-Za-z\s.-]+$/.test(form.city.trim())) {
      return "Please enter a valid city name.";
    }

    if (!form.state) {
      return "Please select the state.";
    }

    if (!/^\d{6}$/.test(form.pinCode)) {
      return "Please enter a valid 6-digit PIN code.";
    }

    if (!form.ownership) {
      return "Please select the facility ownership type.";
    }

    if (!form.operationsAtLocation) {
      return "Please specify whether operations are conducted at this location.";
    }

    if (!form.primaryFacility) {
      return "Please specify whether this is your primary operating location.";
    }

    /*
      Business logic:

      Factory, Manufacturing Unit and Tool Room
      should normally be operational locations.
    */

    if (
      operationalLocations.includes(form.addressType) &&
      form.operationsAtLocation === "No"
    ) {
      return `${form.addressType} should have business or manufacturing operations at the location.`;
    }

    /*
      A location cannot be the primary operating facility
      if no business operations are conducted there.
    */

    if (
      form.operationsAtLocation === "No" &&
      form.primaryFacility === "Yes"
    ) {
      return "A location cannot be your primary operating facility if no business operations are conducted there.";
    }

    return "";
  };

  const handleContinue = () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const factoryAddress = {
      ...form,
      verified: false,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "takshaya_factory_address",
      JSON.stringify(factoryAddress)
    );

    navigate("/authorized-person");
  };

  const handleBack = () => {
    navigate("/udyam-verification");
  };

  return (
    <OnboardingLayout
      step={7}
      left={
        <div className="onboarding-content">

          <div className="onboarding-header">

            <span className="onboarding-eyebrow">
              FACTORY ADDRESS
            </span>

            <h2>
              Tell us where you operate
            </h2>

            <p>
              Add your primary business or operating
              location. This information helps Takshaya
              build your verified company profile.
            </p>

          </div>

          <div className="form-field">

            <label htmlFor="addressType">
              Location Type <span>*</span>
            </label>

            <select
              id="addressType"
              name="addressType"
              value={form.addressType}
              onChange={handleChange}
              className="auth-select"
            >
              <option value="">
                Select location type
              </option>

              {addressTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

          </div>

          <div className="form-field">

            <label htmlFor="addressLine1">
              Address Line 1 <span>*</span>
            </label>

            <input
              id="addressLine1"
              name="addressLine1"
              type="text"
              value={form.addressLine1}
              onChange={handleChange}
              placeholder="Building / Plot / Street"
              autoComplete="street-address"
            />

          </div>

          <div className="form-field">

            <label htmlFor="addressLine2">
              Address Line 2
            </label>

            <input
              id="addressLine2"
              name="addressLine2"
              type="text"
              value={form.addressLine2}
              onChange={handleChange}
              placeholder="Area / Industrial Estate / Landmark"
            />

          </div>

          <div className="form-row">

            <div className="form-field">

              <label htmlFor="city">
                City <span>*</span>
              </label>

              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city"
                autoComplete="address-level2"
              />

            </div>

            <div className="form-field">

              <label htmlFor="state">
                State <span>*</span>
              </label>

              <select
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                className="auth-select"
              >
                <option value="">
                  Select state
                </option>

                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

            </div>

          </div>

          <div className="form-row">

            <div className="form-field">

              <label htmlFor="pinCode">
                PIN Code <span>*</span>
              </label>

              <input
                id="pinCode"
                name="pinCode"
                type="text"
                inputMode="numeric"
                value={form.pinCode}
                onChange={handlePinChange}
                placeholder="6-digit PIN"
                maxLength={6}
                autoComplete="postal-code"
              />

            </div>

            <div className="form-field">

              <label htmlFor="country">
                Country
              </label>

              <input
                id="country"
                name="country"
                type="text"
                value={form.country}
                readOnly
              />

            </div>

          </div>

          <div className="form-field">

            <label htmlFor="ownership">
              Facility Ownership <span>*</span>
            </label>

            <select
              id="ownership"
              name="ownership"
              value={form.ownership}
              onChange={handleChange}
              className="auth-select"
            >
              <option value="">
                Select ownership type
              </option>

              {ownershipOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

          </div>

          <div className="form-field">

            <label>
              Are manufacturing / business operations
              conducted at this location? <span>*</span>
            </label>

            <div className="radio-group">

              <label className="radio-option">
                <input
                  type="radio"
                  name="operationsAtLocation"
                  value="Yes"
                  checked={
                    form.operationsAtLocation === "Yes"
                  }
                  onChange={handleChange}
                />

                <span>Yes</span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="operationsAtLocation"
                  value="No"
                  checked={
                    form.operationsAtLocation === "No"
                  }
                  onChange={handleChange}
                />

                <span>No</span>
              </label>

            </div>

          </div>

          <div className="form-field">

            <label>
              Is this your primary operating location?
              <span> *</span>
            </label>

            <div className="radio-group">

              <label className="radio-option">
                <input
                  type="radio"
                  name="primaryFacility"
                  value="Yes"
                  checked={
                    form.primaryFacility === "Yes"
                  }
                  onChange={handleChange}
                />

                <span>Yes</span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="primaryFacility"
                  value="No"
                  checked={
                    form.primaryFacility === "No"
                  }
                  onChange={handleChange}
                />

                <span>No</span>
              </label>

            </div>

          </div>

          {error && (
            <div className="verification-error">
              {error}
            </div>
          )}

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
              onClick={handleContinue}
            >
              Save & Continue →
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
            Connect the
            <br />
            Physical Network.
          </h1>

          <p>
            Takshaya connects verified businesses with
            manufacturers, tooling partners, suppliers
            and industrial service providers.
          </p>

          <div className="onboarding-points">

            <div>
              <span>✓</span>
              Verified operating locations
            </div>

            <div>
              <span>✓</span>
              Better manufacturing discovery
            </div>

            <div>
              <span>✓</span>
              Location-based business opportunities
            </div>

            <div>
              <span>✓</span>
              Stronger company verification
            </div>

          </div>

          <div className="onboarding-trust">

            <strong>
              Your location matters.
            </strong>

            <span>
              A verified operating location helps
              businesses discover the right manufacturing
              capabilities and partners.
            </span>

          </div>

        </div>
      }
    />
  );
}