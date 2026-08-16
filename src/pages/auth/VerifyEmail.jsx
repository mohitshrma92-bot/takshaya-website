import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../layouts/OnboardingLayout";
import AuthButton from "../../components/auth/AuthButton";
import logo from "../../assets/logo/takshaya-logo.png";
import { supabase } from "../../lib/supabaseClient";
import { useOnboarding } from "../../context/OnboardingContext";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { onboarding, updateSection } = useOnboarding();

  const [email, setEmail] = useState(onboarding.account.email || "");
  const [otp, setOtp] = useState("");
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(0);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  /*
   * Load the email from the onboarding context.
   * We do NOT require an active auth session here because
   * Supabase can have a user waiting for email verification
   * without an active authenticated session.
   */
  useEffect(() => {
    if (onboarding.account.email) {
      setEmail(onboarding.account.email);
    }
  }, [onboarding.account.email]);

  /*
   * Resend countdown
   */
  useEffect(() => {
    if (resendSeconds <= 0) return undefined;

    const timer = window.setInterval(() => {
      setResendSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendSeconds]);

  /*
   * Handle OTP input
   */
  const handleOtpChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  /*
   * Verify the 6-digit OTP using Supabase
   */
  const verifyEmail = async () => {
    if (!email) {
      setStatus({
        type: "error",
        message: "Email address is missing. Please return to signup and try again.",
      });
      return;
    }

    if (otp.length !== 6) {
      setStatus({
        type: "error",
        message: "Please enter the 6-digit verification code.",
      });
      return;
    }

    setChecking(true);
    setStatus({
      type: "",
      message: "",
    });

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) {
        setStatus({
          type: "error",
          message:
            error.message ||
            "The verification code is invalid or has expired.",
        });
        setChecking(false);
        return;
      }

      if (!data?.user) {
        setStatus({
          type: "error",
          message:
            "Email verification could not be completed. Please try again.",
        });
        setChecking(false);
        return;
      }

      /*
       * Save verification state in onboarding context
       */
      updateSection("account", {
        email: data.user.email || email,
        accountCreated: true,
        emailVerified: true,
      });

      setStatus({
        type: "success",
        message: "Email verified successfully.",
      });

      setChecking(false);

      /*
       * Continue to Company Profile / Business Roles
       *
       * Current project flow uses /business-roles.
       */
      navigate("/business-roles");
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error?.message ||
          "Something went wrong while verifying your email.",
      });

      setChecking(false);
    }
  };

  /*
   * Resend verification OTP
   */
  const resendVerification = async () => {
    if (!email || resendSeconds > 0 || resending) return;

    setResending(true);
    setStatus({
      type: "",
      message: "",
    });

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (error) {
        setStatus({
          type: "error",
          message:
            error.message ||
            "Unable to resend the verification code.",
        });
      } else {
        setStatus({
          type: "success",
          message:
            "A new verification code has been sent. Please check your inbox and spam folder.",
        });

        setOtp("");
        setResendSeconds(60);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error?.message ||
          "Unable to resend the verification code.",
      });
    }

    setResending(false);
  };

  return (
    <OnboardingLayout
      step={1}
      left={
        <>
          <img
            src={logo}
            alt="Takshaya"
            className="auth-logo-image"
          />

          <h2>Check Your Email</h2>

          <p>
            We've sent a 6-digit verification code to your
            registered business email.
          </p>

          <div className="verify-card">
            <div className="verify-icon">📧</div>

            <h3>Verify your email</h3>

            <p>
              Enter the verification code sent to your email
              to continue your company registration.
            </p>

            {email && (
              <p className="verify-email-address">
                {email}
              </p>
            )}

            <div className="otp-section">
              <label htmlFor="email-otp">
                Verification Code
              </label>

              <input
                id="email-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit code"
                className="otp-input"
                aria-label="6-digit email verification code"
              />

              <div className="otp-helper">
                Enter the 6-digit code from the email.
              </div>
            </div>

            {status.message && (
              <div
                className={`verify-status ${status.type}`}
                role="alert"
              >
                {status.message}
              </div>
            )}

            <div className="verify-actions">
              <AuthButton
                onClick={verifyEmail}
                disabled={checking || otp.length !== 6}
              >
                {checking
                  ? "Verifying..."
                  : "Verify Email →"}
              </AuthButton>

              <button
                type="button"
                className="text-button"
                onClick={resendVerification}
                disabled={
                  resending ||
                  resendSeconds > 0 ||
                  !email
                }
              >
                {resending
                  ? "Sending..."
                  : resendSeconds > 0
                    ? `Resend available in ${resendSeconds}s`
                    : "Resend Verification Code"}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="back-button-link"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </>
      }
    />
  );
}