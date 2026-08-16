import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";

import { useOnboarding } from "../../context/OnboardingContext";

export default function CompanyProfile() {
  const navigate = useNavigate();

  const {
    onboarding,
    updateSection,
  } = useOnboarding();

  const existingProfile =
    onboarding.companyProfile || {};

  const [legalCompanyName, setLegalCompanyName] =
    useState(
      existingProfile.legalCompanyName || ""
    );

  const [tradeBrandName, setTradeBrandName] =
    useState(
      existingProfile.tradeBrandName || ""
    );

  const [yearEstablished, setYearEstablished] =
    useState(
      existingProfile.yearEstablished || ""
    );

  const [primaryIndustry, setPrimaryIndustry] =
    useState(
      existingProfile.primaryIndustry || ""
    );

  const [companySize, setCompanySize] =
    useState(
      existingProfile.companySize || ""
    );

  const [companyWebsite, setCompanyWebsite] =
    useState(
      existingProfile.companyWebsite || ""
    );

  const [aboutBusiness, setAboutBusiness] =
    useState(
      existingProfile.aboutBusiness || ""
    );

  const [error, setError] =
    useState("");

  /*
   * ---------------------------------------------------------
   * CONTINUE
   * ---------------------------------------------------------
   */

  const handleContinue = (event) => {
    event.preventDefault();

    setError("");

    if (!legalCompanyName.trim()) {
      setError(
        "Please enter your legal company name."
      );
      return;
    }

    if (!yearEstablished.trim()) {
      setError(
        "Please enter the year your company was established."
      );
      return;
    }

    if (!primaryIndustry) {
      setError(
        "Please select your primary industry."
      );
      return;
    }

    if (!companySize) {
      setError(
        "Please select your company size."
      );
      return;
    }

    /*
     * SINGLE SOURCE OF TRUTH
     *
     * Everything is saved into:
     *
     * onboarding.companyProfile
     */

    updateSection(
      "companyProfile",
      {
        legalCompanyName:
          legalCompanyName.trim(),

        tradeBrandName:
          tradeBrandName.trim(),

        yearEstablished:
          yearEstablished.trim(),

        primaryIndustry,

        companySize,

        companyWebsite:
          companyWebsite.trim(),

        aboutBusiness:
          aboutBusiness.trim(),
      }
    );

    navigate(
      "/gst-verification"
    );
  };

  /*
   * ---------------------------------------------------------
   * BACK
   * ---------------------------------------------------------
   */

  const handleBack = () => {
    navigate(
      "/business-roles"
    );
  };

  /*
   * ---------------------------------------------------------
   * UI
   * ---------------------------------------------------------
   */

  return (
    <OnboardingLayout
      step={3}
      left={
        <form
          onSubmit={
            handleContinue
          }
        >

          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>
            Company Profile
          </h2>

          <p>
            Tell us about your company and
            manufacturing business.
          </p>

          {/* =================================================
              LEGAL COMPANY NAME
          ================================================= */}

          <AuthInput
            label="Legal Company Name"
            placeholder="Enter your registered company name"
            value={
              legalCompanyName
            }
            onChange={(event) =>
              setLegalCompanyName(
                event.target.value
              )
            }
          />

          {/* =================================================
              TRADE / BRAND NAME
          ================================================= */}

          <AuthInput
            label="Trade / Brand Name"
            placeholder="Enter your trade or brand name"
            value={
              tradeBrandName
            }
            onChange={(event) =>
              setTradeBrandName(
                event.target.value
              )
            }
          />

          {/* =================================================
              YEAR
          ================================================= */}

          <AuthInput
            label="Year Established"
            type="number"
            placeholder="e.g. 2018"
            value={
              yearEstablished
            }
            onChange={(event) =>
              setYearEstablished(
                event.target.value
              )
            }
            min="1800"
            max={
              new Date().getFullYear()
            }
          />

          {/* =================================================
              PRIMARY INDUSTRY
          ================================================= */}

          <label
            className="auth-label"
            htmlFor="primaryIndustry"
          >
            Primary Industry
          </label>

          <select
            id="primaryIndustry"
            className="auth-select"
            value={
              primaryIndustry
            }
            onChange={(event) =>
              setPrimaryIndustry(
                event.target.value
              )
            }
          >

            <option value="">
              Select primary industry
            </option>

            <option value="Automotive">
              Automotive
            </option>

            <option value="Consumer Products">
              Consumer Products
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Electrical">
              Electrical
            </option>

            <option value="Industrial Equipment">
              Industrial Equipment
            </option>

            <option value="Engineering">
              Engineering
            </option>

            <option value="Plastics">
              Plastics
            </option>

            <option value="Packaging">
              Packaging
            </option>

            <option value="Medical Devices">
              Medical Devices
            </option>

            <option value="Aerospace">
              Aerospace
            </option>

            <option value="Defence">
              Defence
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          {/* =================================================
              COMPANY SIZE
          ================================================= */}

          <label
            className="auth-label"
            htmlFor="companySize"
          >
            Company Size
          </label>

          <select
            id="companySize"
            className="auth-select"
            value={
              companySize
            }
            onChange={(event) =>
              setCompanySize(
                event.target.value
              )
            }
          >

            <option value="">
              Select company size
            </option>

            <option value="1-10">
              1–10 Employees
            </option>

            <option value="11-50">
              11–50 Employees
            </option>

            <option value="51-200">
              51–200 Employees
            </option>

            <option value="201-500">
              201–500 Employees
            </option>

            <option value="501-1000">
              501–1,000 Employees
            </option>

            <option value="1000+">
              1,000+ Employees
            </option>

          </select>

          {/* =================================================
              WEBSITE
          ================================================= */}

          <AuthInput
            label="Company Website"
            placeholder="https://www.example.com"
            value={
              companyWebsite
            }
            onChange={(event) =>
              setCompanyWebsite(
                event.target.value
              )
            }
          />

          {/* =================================================
              ABOUT BUSINESS
          ================================================= */}

          <div className="form-field">

            <label
              htmlFor="aboutBusiness"
              className="auth-label"
            >
              About Your Business
            </label>

            <textarea
              id="aboutBusiness"
              className="auth-textarea"
              placeholder="Briefly describe your business, products, manufacturing capabilities and areas of operation."
              value={
                aboutBusiness
              }
              onChange={(event) =>
                setAboutBusiness(
                  event.target.value
                )
              }
              rows={5}
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