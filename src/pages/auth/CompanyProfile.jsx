import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthButton from "../../components/auth/AuthButton";
import { useOnboarding } from "../../context/OnboardingContext";

import "../../Styles/auth/onboarding.css";

export default function CompanyProfile() {
  const navigate = useNavigate();

  const { onboarding, updateSection } = useOnboarding();

  /*
   * =====================================================
   * COMPANY PROFILE
   * =====================================================
   *
   * The field names here MUST match the
   * OnboardingContext.jsx structure.
   */

  const [formData, setFormData] = useState({
    legalCompanyName:
      onboarding.companyProfile?.legalCompanyName || "",

    tradeBrandName:
      onboarding.companyProfile?.tradeBrandName || "",

    yearEstablished:
      onboarding.companyProfile?.yearEstablished || "",

    primaryIndustry:
      onboarding.companyProfile?.primaryIndustry || "",

    companySize:
      onboarding.companyProfile?.companySize || "",

    companyWebsite:
      onboarding.companyProfile?.companyWebsite || "",

    aboutBusiness:
      onboarding.companyProfile?.aboutBusiness || "",
  });

  const [errors, setErrors] = useState({});

  /*
   * =====================================================
   * BUSINESS ROLES
   * =====================================================
   */

  const roles = onboarding.businessRoles || [];

  const roleLabels = {
    manufacturer: "Manufacturer",
    tool_room: "Tool Room",
    mould_owner: "Mould Owner",
    die_owner: "Die Owner",
    oem: "OEM",
    brand_owner: "Brand Owner",
    contract_manufacturer: "Contract Manufacturer",
    machine_builder: "Machine Builder",
    automation_integrator: "Automation Integrator",
    material_supplier: "Material Supplier",
    service_provider: "Service Provider",
  };

  /*
   * =====================================================
   * HANDLE INPUT CHANGE
   * =====================================================
   */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  /*
   * =====================================================
   * VALIDATION
   * =====================================================
   */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.legalCompanyName.trim()) {
      newErrors.legalCompanyName =
        "Legal company name is required.";
    }

    if (!formData.yearEstablished) {
      newErrors.yearEstablished =
        "Please select the year your business was established.";
    }

    if (!formData.primaryIndustry) {
      newErrors.primaryIndustry =
        "Please select your primary industry.";
    }

    if (!formData.companySize) {
      newErrors.companySize =
        "Please select your company size.";
    }

    if (!formData.aboutBusiness.trim()) {
      newErrors.aboutBusiness =
        "Please provide a short description of your business.";
    }

    if (formData.aboutBusiness.length > 500) {
      newErrors.aboutBusiness =
        "Business description cannot exceed 500 characters.";
    }

    return newErrors;
  };

  /*
   * =====================================================
   * SAVE + CONTINUE
   * =====================================================
   */

  const handleContinue = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    /*
     * Save using the SAME field names as
     * OnboardingContext.jsx
     */

    updateSection("companyProfile", {
      legalCompanyName: formData.legalCompanyName,
      tradeBrandName: formData.tradeBrandName,
      yearEstablished: formData.yearEstablished,
      primaryIndustry: formData.primaryIndustry,
      companySize: formData.companySize,
      companyWebsite: formData.companyWebsite,
      aboutBusiness: formData.aboutBusiness,
    });

    navigate("/gst-verification");
  };

  /*
   * =====================================================
   * BACK
   * =====================================================
   */

  const handleBack = () => {
    navigate("/business-roles");
  };

  /*
   * =====================================================
   * UI
   * =====================================================
   */

  return (
    <OnboardingLayout
      step={3}
      left={
        <div className="onboarding-content">

          {/* HEADER */}

          <div className="onboarding-header">

            <span className="onboarding-eyebrow">
              COMPANY PROFILE
            </span>

            <h2>
              Tell us about your company
            </h2>

            <p>
              Provide your basic business information.
              This information will be used to build
              your Takshaya company profile.
            </p>

          </div>


          {/* BUSINESS ROLES */}

          {roles.length > 0 && (
            <div className="profile-role-summary">

              <span className="profile-summary-label">
                YOUR BUSINESS ROLES
              </span>

              <div className="profile-role-tags">

                {roles.map((role) => (
                  <span
                    key={role}
                    className="profile-role-tag"
                  >
                    {roleLabels[role] || role}
                  </span>
                ))}

              </div>

            </div>
          )}


          {/* FORM */}

          <form
            className="company-profile-form"
            onSubmit={handleContinue}
          >

            {/* LEGAL COMPANY NAME */}

            <div className="form-field">

              <label htmlFor="legalCompanyName">
                Legal Company Name
                <span>*</span>
              </label>

              <input
                id="legalCompanyName"
                name="legalCompanyName"
                type="text"
                value={formData.legalCompanyName}
                onChange={handleChange}
                placeholder="Enter your registered company name"
                autoComplete="organization"
              />

              {errors.legalCompanyName && (
                <small className="form-error">
                  {errors.legalCompanyName}
                </small>
              )}

            </div>


            {/* TRADE / BRAND NAME */}

            <div className="form-field">

              <label htmlFor="tradeBrandName">
                Trade / Brand Name
              </label>

              <input
                id="tradeBrandName"
                name="tradeBrandName"
                type="text"
                value={formData.tradeBrandName}
                onChange={handleChange}
                placeholder="Enter trade or brand name"
              />

            </div>


            {/* YEAR + INDUSTRY */}

            <div className="form-row">

              {/* YEAR */}

              <div className="form-field">

                <label htmlFor="yearEstablished">
                  Year Established
                  <span>*</span>
                </label>

                <select
                  id="yearEstablished"
                  name="yearEstablished"
                  value={formData.yearEstablished}
                  onChange={handleChange}
                  className="auth-select"
                >

                  <option value="">
                    Select year
                  </option>

                  {Array.from(
                    {
                      length:
                        new Date().getFullYear() -
                        1900 +
                        1,
                    },
                    (_, index) =>
                      new Date().getFullYear() - index
                  ).map((year) => (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  ))}

                </select>

                {errors.yearEstablished && (
                  <small className="form-error">
                    {errors.yearEstablished}
                  </small>
                )}

              </div>


              {/* INDUSTRY */}

              <div className="form-field">

                <label htmlFor="primaryIndustry">
                  Primary Industry
                  <span>*</span>
                </label>

                <select
                  id="primaryIndustry"
                  name="primaryIndustry"
                  value={formData.primaryIndustry}
                  onChange={handleChange}
                  className="auth-select"
                >

                  <option value="">
                    Select industry
                  </option>

                  <option value="automotive">
                    Automotive
                  </option>

                  <option value="ev">
                    EV & Mobility
                  </option>

                  <option value="electronics">
                    Electronics
                  </option>

                  <option value="electrical">
                    Electrical
                  </option>

                  <option value="plastics">
                    Plastics & Polymer
                  </option>

                  <option value="consumer">
                    Consumer Products
                  </option>

                  <option value="medical">
                    Medical & Healthcare
                  </option>

                  <option value="industrial">
                    Industrial Equipment
                  </option>

                  <option value="aerospace">
                    Aerospace & Defence
                  </option>

                  <option value="packaging">
                    Packaging
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

                {errors.primaryIndustry && (
                  <small className="form-error">
                    {errors.primaryIndustry}
                  </small>
                )}

              </div>

            </div>


            {/* COMPANY SIZE */}

            <div className="form-field">

              <label htmlFor="companySize">
                Company Size
                <span>*</span>
              </label>

              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="auth-select"
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

              {errors.companySize && (
                <small className="form-error">
                  {errors.companySize}
                </small>
              )}

            </div>


            {/* WEBSITE */}

            <div className="form-field">

              <label htmlFor="companyWebsite">
                Company Website
              </label>

              <input
                id="companyWebsite"
                name="companyWebsite"
                type="url"
                value={formData.companyWebsite}
                onChange={handleChange}
                placeholder="https://www.example.com"
                autoComplete="url"
              />

            </div>


            {/* BUSINESS DESCRIPTION */}

            <div className="form-field">

              <label htmlFor="aboutBusiness">
                About Your Business
                <span>*</span>
              </label>

              <textarea
                id="aboutBusiness"
                name="aboutBusiness"
                value={formData.aboutBusiness}
                onChange={handleChange}
                placeholder="Briefly describe what your company manufactures, supplies or provides."
                rows={4}
                maxLength={500}
              />

              <div className="character-count">
                {formData.aboutBusiness.length}/500
              </div>

              {errors.aboutBusiness && (
                <small className="form-error">
                  {errors.aboutBusiness}
                </small>
              )}

            </div>


            {/* BUTTONS */}

            <div className="button-group">

              <AuthButton
                type="button"
                variant="secondary"
                onClick={handleBack}
              >
                ← Back
              </AuthButton>

              <AuthButton type="submit">
                Save & Continue →
              </AuthButton>

            </div>

          </form>

        </div>
      }

      right={
        <div className="onboarding-right-content">

          <span className="onboarding-right-badge">
            TAKSHAYA
          </span>

          <h1>
            Build Your
            <br />
            Company Profile.
          </h1>

          <p>
            Your company profile becomes the foundation
            for trusted interactions across the Takshaya
            manufacturing ecosystem.
          </p>

          <div className="onboarding-points">

            <div>
              <span>✓</span>
              Structured business identity
            </div>

            <div>
              <span>✓</span>
              Relevant industry matching
            </div>

            <div>
              <span>✓</span>
              Personalised manufacturing opportunities
            </div>

            <div>
              <span>✓</span>
              Secure company information
            </div>

          </div>

          <div className="onboarding-trust">

            <strong>
              Verification comes next.
            </strong>

            <span>
              After your company profile is completed,
              Takshaya will guide you through GST, PAN,
              UDYAM and business verification.
            </span>

          </div>

        </div>
      }
    />
  );
}