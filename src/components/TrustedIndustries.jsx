export default function TrustedIndustries() {
  const industries = [
    "Automotive",
    "Packaging",
    "Consumer Goods",
    "Electronics",
    "Medical",
    "Industrial",
  ];

  return (
    <section className="trusted">
      <div className="container">

        <h2>Industries We Aim to Serve</h2>

        <div className="industry-grid">
          {industries.map((industry) => (
            <div key={industry} className="industry-card">
              {industry}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}