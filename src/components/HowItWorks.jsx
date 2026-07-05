export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Register",
      description:
        "Sign up as a Manufacturer, Brand, Tool Owner or Tool Room."
    },
    {
      number: "02",
      title: "Submit Requirement",
      description:
        "Manufacturers request tooling or Tool Owners list available moulds and dies."
    },
    {
      number: "03",
      title: "Verification",
      description:
        "Takshaya verifies tooling information and business requirements."
    },
    {
      number: "04",
      title: "Connect & Collaborate",
      description:
        "We connect the right manufacturers with the right tooling partners."
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">

        <h2>How Takshaya Works</h2>

        <p className="section-subtitle">
          A simple, transparent process to unlock manufacturing opportunities.
        </p>

        <div className="steps">

          {steps.map((step) => (
            <div className="step-card" key={step.number}>

              <div className="step-number">
                {step.number}
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}