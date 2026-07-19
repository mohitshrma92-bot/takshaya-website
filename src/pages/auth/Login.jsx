export default function Login() {
  return (
    <div className="container" style={{ padding: "80px 20px" }}>
      <h1>Login</h1>

      <p>Welcome back to Takshaya.</p>

      <form
        style={{
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "30px",
        }}
      >
        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button className="primary">
          Login
        </button>
      </form>
    </div>
  );
}