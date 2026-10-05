import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      style={{
        maxWidth: "560px",
        margin: "0 auto",
        padding: "96px 24px",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "12px" }}>Page not found</h1>
      <p style={{ marginBottom: "24px" }}>
        This address does not exist. Check the link, or go back to a page
        below.
      </p>
      <p>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/dashboard">Dashboard</Link>
      </p>
    </main>
  );
}
