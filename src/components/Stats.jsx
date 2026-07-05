export default function Stats() {
  const stats = [
    {
      number: "₹250 Cr+",
      title: "Idle Tooling Potential",
    },
    {
      number: "10,000+",
      title: "Target Moulds & Dies",
    },
    {
      number: "500+",
      title: "Target Tool Rooms",
    },
    {
      number: "100+",
      title: "Manufacturers Onboarding",
    },
  ];

  return (
    <section className="stats">
      <div className="container">

        <h2>Building India's Manufacturing Tooling Ecosystem</h2>

        <p className="section-subtitle">
          Our vision is to create India's largest digital network for tooling, manufacturing partnerships, and industrial collaboration.
        </p>

        <div className="stats-grid">
          {stats.map((item) => (
            <div className="stat-card" key={item.title}>
              <h3>{item.number}</h3>
              <p>{item.title}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}