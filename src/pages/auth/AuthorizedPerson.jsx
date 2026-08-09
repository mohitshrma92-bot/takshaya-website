import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import { useOnboarding } from "../../context/OnboardingContext";

import "../../Styles/auth/auth.css";

export default function AuthorizedPerson() {
  const navigate = useNavigate();

  const { onboarding, updateSection } = useOnboarding();

  /*
   * Load existing authorized person data if the user
   * comes back to this page.
   */
  const [form, setForm] = useState({
    fullName:
      onboarding.authorizedPerson?.fullName || "",

    designation:
      onboarding.authorizedPerson?.designation || "",

    email:
      onboarding.authorizedPerson?.businessEmail || "",

    mobile:
      onboarding.authorizedPerson?.mobileNumber || "",

    authorizationType:
      onboarding.authorizedPerson?.authorizationType || "",

    authorized:
      onboarding.authorizedPerson?.isAuthorized
        ? "yes"
        : "",

    governmentId:
      onboarding.authorizedPerson?.governmentId || null,

    profilePhoto:
      onboarding.authorizedPerson?.profilePhoto || null,
  });

  const [error, setError] = useState("");

  /*
   * =====================================================
   * HANDLE CHANGE
   * =====================================================
   */

  const handleChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  };

  /*
   * =====================================================
   * EMAIL VALIDATION
   * =====================================================
   */

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email.trim()
    );
  };

  /*
   * =====================================================
   * MOBILE VALIDATION
   * =====================================================
   */

  const isValidMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(
      mobile.trim()
    );
  };

  /*
   * =====================================================
   * SUBMIT
   * =====================================================
   */

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    /*
     * FULL NAME
     */

    if (!form.fullName.trim()) {
      setError(
        "Please enter the full name."
      );
      return;
    }

    /*
     * DESIGNATION
     */

    if (!form.designation.trim()) {
      setError(
        "Please enter the designation."
      );
      return;
    }

    /*
     * EMAIL
     */

    if (!form.email.trim()) {
      setError(
        "Please enter the business email."
      );
      return;
    }

    if (!isValidEmail(form.email)) {
      setError(
        "Please enter a valid business email."
      );
      return;
    }

    /*
     * MOBILE
     */

    if (!form.mobile.trim()) {
      setError(
        "Please enter the mobile number."
      );
      return;
    }

    if (!isValidMobile(form.mobile)) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    /*
     * AUTHORIZATION TYPE
     */

    if (!form.authorizationType) {
      setError(
        "Please select the authorization type."
      );
      return;
    }

    /*
     * AUTHORIZATION CONFIRMATION
     */

    if (form.authorized !== "yes") {
      setError(
        "This person must be authorized to represent the company to continue."
      );
      return;
    }

    /*
     * =================================================
     * SAVE TO ONBOARDING CONTEXT
     * =================================================
     */

    updateSection("authorizedPerson", {
      fullName: form.fullName.trim(),

      designation:
        form.designation.trim(),

      businessEmail:
        form.email.trim(),

      mobileNumber:
        form.mobile.trim(),

      authorizationType:
        form.authorizationType,

      isAuthorized:
        form.authorized === "yes",

      governmentId:
        form.governmentId,

      profilePhoto:
        form.profilePhoto,
    });

    /*
     * Go to review page
     */

    navigate("/review-submit");
  };

  return (
    <OnboardingLayout
      step={8}

      left={
        <>
          <h2>
            Tell us who represents your business
          </h2>

          <p>
            Provide the details of the person authorized
            to represent your company on Takshaya.
          </p>

          {/* =================================================
              FORM START
          ================================================= */}

          <form onSubmit={handleSubmit}>

            {/* =================================================
                FULL NAME
            ================================================= */}

            <AuthInput
              label="Full Name"
              placeholder="Enter full name"
              value={form.fullName}
              onChange={(e) =>
                handleChange(
                  "fullName",
                  e.target.value
                )
              }
              required
            />

            {/* =================================================
                DESIGNATION
            ================================================= */}

            <AuthInput
              label="Designation"
              placeholder="Director / Owner / Manager"
              value={form.designation}
              onChange={(e) =>
                handleChange(
                  "designation",
                  e.target.value
                )
              }
              required
            />

            {/* =================================================
                BUSINESS EMAIL
            ================================================= */}

            <AuthInput
              label="Business Email"
              type="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={(e) =>
                handleChange(
                  "email",
                  e.target.value
                )
              }
              required
            />

            {/* =================================================
                MOBILE
            ================================================= */}

            <AuthInput
              label="Mobile Number"
              type="tel"
              placeholder="10-digit mobile number"
              value={form.mobile}
              onChange={(e) =>
                handleChange(
                  "mobile",
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10)
                )
              }
              required
            />

            {/* =================================================
                AUTHORIZATION TYPE
            ================================================= */}

            <div className="auth-field">

              <label>
                Authorization Type{" "}
                <span>*</span>
              </label>

              <select
                value={form.authorizationType}
                onChange={(e) =>
                  handleChange(
                    "authorizationType",
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select authorization type
                </option>

                <option value="director">
                  Director
                </option>

                <option value="partner">
                  Partner
                </option>

                <option value="proprietor">
                  Proprietor
                </option>

                <option value="authorized-signatory">
                  Authorized Signatory
                </option>

                <option value="company-representative">
                  Company Representative
                </option>

                <option value="other">
                  Other
                </option>
              </select>

            </div>

            {/* =================================================
                AUTHORIZATION CONFIRMATION
            ================================================= */}

            <div className="auth-radio-group">

              <label>
                Is this person authorized to
                represent the company?{" "}
                <span>*</span>
              </label>

              <div className="radio-options">

                <label>

                  <input
                    type="radio"
                    name="authorized"
                    value="yes"
                    checked={
                      form.authorized === "yes"
                    }
                    onChange={(e) =>
                      handleChange(
                        "authorized",
                        e.target.value
                      )
                    }
                  />

                  Yes

                </label>

                <label>

                  <input
                    type="radio"
                    name="authorized"
                    value="no"
                    checked={
                      form.authorized === "no"
                    }
                    onChange={(e) =>
                      handleChange(
                        "authorized",
                        e.target.value
                      )
                    }
                  />

                  No

                </label>

              </div>

            </div>

            {/* =================================================
                GOVERNMENT ID
            ================================================= */}

            <div className="upload-box">

              <h4>
                Government ID
              </h4>

              <p>
                Upload Aadhaar / Passport /
                Driving Licence
                <br />

                <small>
                  Optional for now
                </small>
              </p>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleChange(
                    "governmentId",
                    e.target.files?.[0] || null
                  )
                }
              />

            </div>

            {/* =================================================
                PROFILE PHOTO
            ================================================= */}

            <div className="upload-box">

              <h4>
                Profile Photo
              </h4>

              <p>
                Upload passport-size photograph
                <br />

                <small>
                  Optional for now
                </small>
              </p>

              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) =>
                  handleChange(
                    "profilePhoto",
                    e.target.files?.[0] || null
                  )
                }
              />

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="button-group">

              <AuthButton
                variant="secondary"
                type="button"
                onClick={() =>
                  navigate("/factory-address")
                }
              >
                ← Back
              </AuthButton>

              <AuthButton
                type="submit"
              >
                Save & Continue →
              </AuthButton>

            </div>

          </form>

          {/* =================================================
              FORM END
          ================================================= */}

        </>
      }

      right={
        <div className="auth-right-content">

          <h1>
            Authorized
            <br />
            Representative
          </h1>

          <p>
            This person will represent the company
            on Takshaya and manage business
            communication, verification and approvals.
          </p>

          <div className="auth-features">

            <div className="feature-item">
              ✓ Company Representative
            </div>

            <div className="feature-item">
              ✓ Secure Communication
            </div>

            <div className="feature-item">
              ✓ Business Approval Rights
            </div>

            <div className="feature-item">
              ✓ Verified Identity
            </div>

          </div>

          <div className="auth-stats">

            <div>
              <h3>1</h3>
              <span>
                Representative
              </span>
            </div>

            <div>
              <h3>100%</h3>
              <span>
                Secure
              </span>
            </div>

            <div>
              <h3>
                Verified
              </h3>
              <span>
                Identity
              </span>
            </div>

          </div>

        </div>
      }
    />
  );
}