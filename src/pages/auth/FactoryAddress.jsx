import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";

import { useOnboarding } from "../../context/OnboardingContext";

export default function FactoryAddress() {
  const navigate = useNavigate();

  const {
    onboarding,
    setSection,
  } = useOnboarding();

  /*
   * ---------------------------------------------------------
   * EXISTING ADDRESS
   * ---------------------------------------------------------
   */

  const existingAddresses =
    Array.isArray(
      onboarding.factoryAddresses
    )
      ? onboarding.factoryAddresses
      : [];

  const existingAddress =
    existingAddresses[0] || {};

  /*
   * ---------------------------------------------------------
   * FORM STATE
   * ---------------------------------------------------------
   */

  const [addressType, setAddressType] =
    useState(
      existingAddress.addressType ||
        "Factory"
    );

  const [addressLine1, setAddressLine1] =
    useState(
      existingAddress.addressLine1 ||
        ""
    );

  const [addressLine2, setAddressLine2] =
    useState(
      existingAddress.addressLine2 ||
        ""
    );

  const [city, setCity] =
    useState(
      existingAddress.city ||
        ""
    );

  const [state, setState] =
    useState(
      existingAddress.state ||
        ""
    );

  const [pinCode, setPinCode] =
    useState(
      existingAddress.pinCode ||
        ""
    );

  const [country, setCountry] =
    useState(
      existingAddress.country ||
        "India"
    );

  const [error, setError] =
    useState("");

  /*
   * ---------------------------------------------------------
   * CONTINUE
   * ---------------------------------------------------------
   */

  const handleContinue = (
    event
  ) => {
    event.preventDefault();

    setError("");

    /*
     * Required fields
     */

    if (!addressLine1.trim()) {
      setError(
        "Please enter your address."
      );

      return;
    }

    if (!city.trim()) {
      setError(
        "Please enter your city."
      );

      return;
    }

    if (!state.trim()) {
      setError(
        "Please enter your state."
      );

      return;
    }

    if (!pinCode.trim()) {
      setError(
        "Please enter your PIN code."
      );

      return;
    }

    if (!/^\d{6}$/.test(
      pinCode.trim()
    )) {
      setError(
        "Please enter a valid 6-digit PIN code."
      );

      return;
    }

    /*
     * -------------------------------------------------------
     * SAVE ADDRESS
     * -------------------------------------------------------
     *
     * IMPORTANT:
     *
     * ReviewSubmit.jsx reads:
     *
     * onboarding.factoryAddresses
     *
     * So we save directly into that section.
     *
     */

    const factoryAddress = {
      id:
        existingAddress.id ||
        `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,

      addressType,

      addressLine1:
        addressLine1.trim(),

      addressLine2:
        addressLine2.trim(),

      city:
        city.trim(),

      state:
        state.trim(),

      pinCode:
        pinCode.trim(),

      country:
        country.trim(),
    };

    setSection(
      "factoryAddresses",
      [factoryAddress]
    );

    /*
     * Continue to authorized person.
     */

    navigate(
      "/authorized-person"
    );
  };

  /*
   * ---------------------------------------------------------
   * BACK
   * ---------------------------------------------------------
   */

  const handleBack = () => {
    navigate(
      "/udyam-verification"
    );
  };

  /*
   * ---------------------------------------------------------
   * UI
   * ---------------------------------------------------------
   */

  return (
    <OnboardingLayout
      step={7}
      left={
        <form
          onSubmit={
            handleContinue
          }
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          {/* =================================================
              HEADER
          ================================================= */}

          <span className="onboarding-eyebrow">
            FACTORY / OPERATING LOCATION
          </span>

          <h2>
            Factory Address
          </h2>

          <p>
            Add the primary factory or operating
            location associated with your business.
          </p>

          {/* =================================================
              ADDRESS TYPE
          ================================================= */}

          <label
            className="auth-label"
            htmlFor="addressType"
          >
            Location Type
          </label>

          <select
            id="addressType"
            className="auth-select"
            value={
              addressType
            }
            onChange={(event) =>
              setAddressType(
                event.target.value
              )
            }
          >

            <option value="Factory">
              Factory
            </option>

            <option value="Manufacturing Unit">
              Manufacturing Unit
            </option>

            <option value="Plant">
              Plant
            </option>

            <option value="Warehouse">
              Warehouse
            </option>

            <option value="Office">
              Office
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          {/* =================================================
              ADDRESS LINE 1
          ================================================= */}

          <div className="form-field">

            <label
              htmlFor="addressLine1"
              className="auth-label"
            >
              Address Line 1
              <span>*</span>
            </label>

            <input
              id="addressLine1"
              name="addressLine1"
              type="text"
              value={
                addressLine1
              }
              onChange={(event) =>
                setAddressLine1(
                  event.target.value
                )
              }
              placeholder="Building, plot, street"
              autoComplete="street-address"
            />

          </div>

          {/* =================================================
              ADDRESS LINE 2
          ================================================= */}

          <div className="form-field">

            <label
              htmlFor="addressLine2"
              className="auth-label"
            >
              Address Line 2
            </label>

            <input
              id="addressLine2"
              name="addressLine2"
              type="text"
              value={
                addressLine2
              }
              onChange={(event) =>
                setAddressLine2(
                  event.target.value
                )
              }
              placeholder="Area, landmark, locality"
            />

          </div>

          {/* =================================================
              CITY
          ================================================= */}

          <div className="form-field">

            <label
              htmlFor="city"
              className="auth-label"
            >
              City
              <span>*</span>
            </label>

            <input
              id="city"
              name="city"
              type="text"
              value={
                city
              }
              onChange={(event) =>
                setCity(
                  event.target.value
                )
              }
              placeholder="Enter city"
              autoComplete="address-level2"
            />

          </div>

          {/* =================================================
              STATE
          ================================================= */}

          <div className="form-field">

            <label
              htmlFor="state"
              className="auth-label"
            >
              State
              <span>*</span>
            </label>

            <select
              id="state"
              className="auth-select"
              value={
                state
              }
              onChange={(event) =>
                setState(
                  event.target.value
                )
              }
            >

              <option value="">
                Select state
              </option>

              <option value="Andhra Pradesh">
                Andhra Pradesh
              </option>

              <option value="Assam">
                Assam
              </option>

              <option value="Bihar">
                Bihar
              </option>

              <option value="Chhattisgarh">
                Chhattisgarh
              </option>

              <option value="Delhi">
                Delhi
              </option>

              <option value="Goa">
                Goa
              </option>

              <option value="Gujarat">
                Gujarat
              </option>

              <option value="Haryana">
                Haryana
              </option>

              <option value="Himachal Pradesh">
                Himachal Pradesh
              </option>

              <option value="Jharkhand">
                Jharkhand
              </option>

              <option value="Karnataka">
                Karnataka
              </option>

              <option value="Kerala">
                Kerala
              </option>

              <option value="Madhya Pradesh">
                Madhya Pradesh
              </option>

              <option value="Maharashtra">
                Maharashtra
              </option>

              <option value="Odisha">
                Odisha
              </option>

              <option value="Punjab">
                Punjab
              </option>

              <option value="Rajasthan">
                Rajasthan
              </option>

              <option value="Tamil Nadu">
                Tamil Nadu
              </option>

              <option value="Telangana">
                Telangana
              </option>

              <option value="Uttar Pradesh">
                Uttar Pradesh
              </option>

              <option value="Uttarakhand">
                Uttarakhand
              </option>

              <option value="West Bengal">
                West Bengal
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* =================================================
              PIN CODE
          ================================================= */}

          <div className="form-field">

            <label
              htmlFor="pinCode"
              className="auth-label"
            >
              PIN Code
              <span>*</span>
            </label>

            <input
              id="pinCode"
              name="pinCode"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={
                pinCode
              }
              onChange={(event) =>
                setPinCode(
                  event.target.value
                    .replace(
                      /\D/g,
                      ""
                    )
                    .slice(
                      0,
                      6
                    )
                )
              }
              placeholder="6-digit PIN code"
              autoComplete="postal-code"
            />

          </div>

          {/* =================================================
              COUNTRY
          ================================================= */}

          <div className="form-field">

            <label
              htmlFor="country"
              className="auth-label"
            >
              Country
            </label>

            <input
              id="country"
              name="country"
              type="text"
              value={
                country
              }
              onChange={(event) =>
                setCountry(
                  event.target.value
                )
              }
              autoComplete="country-name"
            />

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className="auth-error"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* =================================================
              BUTTONS
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