export default function Industries() {
  const industries = [
    {
      icon: "🚗",
      title: "Automotive",
      description: "Injection moulds, dies, fixtures and production tooling."
    },
    {
      icon: "📦",
      title: "Packaging",
      description: "Bottle moulds, cap moulds, closures and packaging tools."
    },
    {
      icon: "🏠",
      title: "Consumer Goods",
      description: "Household products, appliances and plastic components."
    },
    {
      icon: "💻",
      title: "Electronics",
      description: "Precision tooling for electrical and electronic manufacturing."
    },
    {
      icon: "🏥",
      title: "Medical",
      description: "High-precision moulds for healthcare and medical devices."
    },
    {
      icon: "🏭",
      title: "Industrial",
      description: "Engineering tools, jigs, fixtures and industrial equipment."
    },
  ];

  return (
    <section id="industries" className="industries">
      <div className="container">

        <span className="section-tag">
          WHO WE SERVE
        </span>

        <h2>Built for Every Manufacturing Industry</h2>

        <p className="section-description">
          Takshaya connects manufacturers, brands and tooling partners across
          India's major manufacturing sectors.
        </p>

        <div className="industry-grid">

          {industries.map((industry) => (
            <div key={industry.title} className="industry-card">
                <div className="industry-icon">
                 {industry.icon}
                </div>
              <h3>{industry.title}</h3>
              <p>{industry.description}</p>
            </div>
          ))}

        </div>
          <p className="industries-note">
            Don't see your industry? Takshaya is built to support every manufacturing
            sector that relies on moulds, dies, tooling and industrial assets.
          </p>
      </div>
    </section>
  );
}