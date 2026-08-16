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
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(0);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;

      if (data.user?.email) {
        setEmail(data.user.email);
      }

      if (data.user?.email_confirmed_at) {
        updateSection("account", {
          email: data.user.email,
          accountCreated: true,
          emailVerified: true,
        });
      }
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted || !session?.user) return;

        setEmail(session.user.email || "");

        if (session.user.email_confirmed_at) {
          updateSection("account", {
            email: session.user.email,
            accountCreated: true,
            emailVerified: true,
          });
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [updateSection]);

  useEffect(() => {
    if (resendSeconds <= 0) return undefined;

    const timer = window.setInterval(() => {
      setResendSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendSeconds]);

  const checkVerification = async () => {
    setChecking(true);
    setStatus({ type: "", message: "" });

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      setStatus({ type: "error", message: error.message });
      setChecking(false);
      return;
    }

    if (data.user?.email_confirmed_at) {
      updateSection("account", {
        email: data.user.email,
        accountCreated: true,
        emailVerified: true,
      });
      setStatus({ type: "success", message: "Email verified successfully." });
      setChecking(false);
      navigate("/business-roles");
      return;
    }

    setStatus({
      type: "error",
      message: "Your email is not verified yet. Open the latest verification email and click the verification link, then try again.",
    });
    setChecking(false);
  };

  const resendVerification = async () => {
    if (!email || resendSeconds > 0 || resending) return;

    setResending(true);
    setStatus({ type: "", message: "" });

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-email`,
      },
    });

    if (error) {
      setStatus({ type: "error", message: error.message || "Unable to resend the verification email." });
    } else {
      setStatus({
        type: "success",
        message: "A new verification email has been sent. Please check your inbox and spam folder.",
      });
      setResendSeconds(60);
    }

    setResending(false);
  };

  return (
    <OnboardingLayout
      step={1}
      left={
        <>
          <img src={logo} alt="Takshaya" className="auth-logo-image" />

          <h2>Check Your Email</h2>
          <p>
            We've sent a verification link to your registered business email.
          </p>

          <div className="verify-card">
            <div className="verify-icon">📧</div>
            <h3>Verify your email</h3>
            <p>
              Click the verification link in your inbox to continue your company registration.
            </p>

            {email && (
              <p className="verify-email-address">{email}</p>
            )}

            {status.message && (
              <div className={`verify-status ${status.type}`} role="alert">
                {status.message}
              </div>
            )}

            <div className="verify-actions">
              <AuthButton onClick={checkVerification} disabled={checking}>
                {checking ? "Checking..." : "I've Verified My Email →"}
              </AuthButton>

              <button
                type="button"
                className="text-button"
                onClick={resendVerification}
                disabled={resending || resendSeconds > 0 || !email}
              >
                {resending
                  ? "Sending..."
                  : resendSeconds > 0
                    ? `Resend available in ${resendSeconds}s`
                    : "Resend Verification Email"}
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