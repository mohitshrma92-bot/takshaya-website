import {
  Package,
  MessageSquare,
  Building2,
  TrendingUp,
} from "lucide-react";

export default function DashboardCards() {
  const cards = [
    {
      title: "Active Tool Listings",
      value: "24",
      icon: <Package size={28} />,
      color: "#2563EB",
      change: "+12% this month",
    },
    {
      title: "Open Enquiries",
      value: "12",
      icon: <MessageSquare size={28} />,
      color: "#10B981",
      change: "5 awaiting response",
    },
    {
      title: "Verified Partners",
      value: "89",
      icon: <Building2 size={28} />,
      color: "#F59E0B",
      change: "+7 new this week",
    },
    {
      title: "Business Growth",
      value: "18%",
      icon: <TrendingUp size={28} />,
      color: "#8B5CF6",
      change: "Compared to last month",
    },
  ];

  return (
    <>
      <div className="dashboard-header">

        <div>
          <h1>Welcome back, Mohit 👋</h1>

          <p>
            Here's what's happening across your manufacturing network today.
          </p>
        </div>

      </div>

      <section className="dashboard-cards">

        {cards.map((card) => (
          <div className="dashboard-card" key={card.title}>

            <div
              className="dashboard-card-icon"
              style={{ background: card.color }}
            >
              {card.icon}
            </div>

            <div className="dashboard-card-info">

              <h2>{card.value}</h2>

              <h4>{card.title}</h4>

              <span>{card.change}</span>

            </div>

          </div>
        ))}

      </section>
    </>
  );
}