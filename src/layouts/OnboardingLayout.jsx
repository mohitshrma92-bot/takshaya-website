import AuthLayout from "./AuthLayout";

export default function OnboardingLayout({ left, step }) {
  const steps = [
    "Account Created",
    "Verify Email",
    "Company Profile",
    "Business Role",
    "GST Verification",
    "PAN Verification",
    "UDYAM Verification",
    "Factory Address",
    "Authorized Person",
    "Review & Submit"
  ];

  return (
    <AuthLayout
      left={left}
      right={
        <div className="onboarding-right">

          <h1>Company Onboarding</h1>

          <p>
            Complete your business verification to unlock the full Takshaya
            platform.
          </p>

          <div className="onboarding-progress">
            {steps.map((item, index) => (
              <div
                key={item}
                className={
                  index < step
                    ? "progress-step completed"
                    : index === step
                    ? "progress-step active"
                    : "progress-step"
                }
              >
                <div className="progress-dot"></div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="progress-footer">
            <h3>Estimated Time</h3>
            <p>5–7 Minutes</p>
          </div>

        </div>
      }
    />
  );
}