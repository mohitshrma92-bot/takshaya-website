export default function Stats() {
  const stats = [
  {
    number: "₹50,000+ Cr",
    title: "Idle Tooling Potential",
    description: "Untapped manufacturing assets across India.",
  },
  {
    number: "100,000+",
    title: "Digital Tool Inventory",
    description: "Building India's largest tooling inventory.",
  },
  {
    number: "10,000+",
    title: "Target Tool Rooms",
    description: "Connecting verified tooling partners.",
  },
  {
    number: "50,000+",
    title: "Manufacturing Partners",
    description: "Helping manufacturers scale faster.",
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

              <h4>{item.title}</h4>

              <p>{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}