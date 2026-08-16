import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";
import { supabase } from "../../lib/supabaseClient";
import { useOnboarding } from "../../context/OnboardingContext";

const passwordChecks = (password) => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /\d/.test(password),
  special: /[^A-Za-z0-9]/.test(password),
});

const isStrongPassword = (password) => {
  const checks = passwordChecks(password);
  return Object.values(checks).every(Boolean);
};

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

const isValidMobile = (mobile) =>
  /^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(mobile.replace(/[()]/g, "").trim());

export default function Signup() {
  const navigate = useNavigate();
  const { updateSection } = useOnboarding();

  const [form, setForm] = useState({
    companyName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const checks = useMemo(() => passwordChecks(form.password), [form.password]);
  const strength = useMemo(() => {
    const score = Object.values(checks).filter(Boolean).length;
    if (!form.password) return { label: "", width: 0 };
    if (score <= 2) return { label: "Weak", width: 35 };
    if (score <= 4) return { label: "Medium", width: 70 };
    return { label: "Strong", width: 100 };
  }, [checks, form.password]);

  const updateField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: "" }));
    setSubmitError("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.companyName.trim()) {
      nextErrors.companyName = "Company name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Business email is required.";
    } else if (!isValidEmail(form.email.trim())) {
      nextErrors.email = "Enter a valid business email address.";
    }

    if (!form.mobile.trim()) {
      nextErrors.mobile = "Mobile number is required.";
    } else if (!isValidMobile(form.mobile)) {
      nextErrors.mobile = "Enter a valid Indian mobile number.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (!isStrongPassword(form.password)) {
      nextErrors.password = "Password does not meet all security requirements.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!termsAccepted) {
      nextErrors.terms = "You must accept the Terms & Conditions and Privacy Policy.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setSubmitting(true);

    const email = form.email.trim().toLowerCase();
    const companyName = form.companyName.trim();

    const { data, error } = await supabase.auth.signUp({
      email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-email`,
        data: {
          company_name: companyName,
          mobile_number: form.mobile.trim(),
        },
      },
    });

    if (error) {
      setSubmitError(error.message || "Unable to create your account. Please try again.");
      setSubmitting(false);
      return;
    }

    updateSection("account", {
      email,
      accountCreated: true,
      emailVerified: Boolean(data.user?.email_confirmed_at),
    });

    updateSection("companyProfile", {
      legalCompanyName: companyName,
    });

    navigate("/verify-email");
  };

  return (
    <AuthLayout
      left={
        <form onSubmit={handleSignup} noValidate>
          <img src={logo} alt="Takshaya" className="auth-logo-image" />

          <h2>Create Company Account</h2>
          <p>Join India's Verified Manufacturing Tooling Exchange.</p>

          {submitError && (
            <div className="form-alert" role="alert">
              {submitError}
            </div>
          )}

          <AuthInput
            label="Company Name"
            placeholder="ABC Engineering Pvt. Ltd."
            value={form.companyName}
            onChange={(event) => updateField("companyName", event.target.value)}
            error={errors.companyName}
            required
            autoComplete="organization"
          />

          <AuthInput
            label="Business Email"
            type="email"
            placeholder="info@company.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            error={errors.email}
            required
            autoComplete="email"
          />

          <AuthInput
            label="Mobile Number"
            placeholder="+91 9876543210"
            value={form.mobile}
            onChange={(event) => updateField("mobile", event.target.value)}
            error={errors.mobile}
            required
            autoComplete="tel"
            maxLength={14}
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            error={errors.password}
            required
            autoComplete="new-password"
            minLength={8}
          />

          {form.password && (
            <div className="password-requirements">
              <p>Password requirements</p>
              <ul>
                <li className={checks.length ? "valid" : "invalid"}>At least 8 characters</li>
                <li className={checks.uppercase ? "valid" : "invalid"}>One uppercase letter</li>
                <li className={checks.lowercase ? "valid" : "invalid"}>One lowercase letter</li>
                <li className={checks.number ? "valid" : "invalid"}>One number</li>
                <li className={checks.special ? "valid" : "invalid"}>One special character</li>
              </ul>
              <div className="password-strength">
                <div className="password-strength-bar">
                  <div className="password-strength-fill" style={{ width: `${strength.width}%` }} />
                </div>
                <div className="password-strength-label">
                  <span>Password strength</span>
                  <strong>{strength.label}</strong>
                </div>
              </div>
            </div>
          )}

          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={(event) => updateField("confirmPassword", event.target.value)}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
          />

          <label className="terms-check-qa">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(event) => {
                setTermsAccepted(event.target.checked);
                setErrors((previous) => ({ ...previous, terms: "" }));
              }}
            />
            <span>
              I agree to the <Link to="/terms" target="_blank" rel="noreferrer">Terms & Conditions</Link> and <Link to="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</Link>.
              {errors.terms && <span className="field-error">{errors.terms}</span>}
            </span>
          </label>

          <AuthButton type="submit" disabled={submitting}>
            {submitting ? "Creating Account..." : "Create Company Account →"}
          </AuthButton>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </form>
      }

      right={
        <div className="auth-right-content">
          <h1>India's Manufacturing Tooling Network</h1>
          <p>
            Connect manufacturers, tool rooms, mould owners and industrial partners on one trusted platform.
          </p>
          <div className="auth-features">
            <div className="feature-item">✓ Verified Manufacturers</div>
            <div className="feature-item">✓ Verified Tool Rooms</div>
            <div className="feature-item">✓ Secure Collaboration</div>
            <div className="feature-item">✓ Faster Tool Procurement</div>
          </div>
          <div className="auth-stats">
            <div><h3>100K+</h3><span>Moulds & Dies</span></div>
            <div><h3>10K+</h3><span>Tool Rooms</span></div>
            <div><h3>50K+</h3><span>Manufacturers</span></div>
          </div>
          <p className="auth-trust">Trusted by India's growing manufacturing ecosystem.</p>
        </div>
      }
    />
  );
}