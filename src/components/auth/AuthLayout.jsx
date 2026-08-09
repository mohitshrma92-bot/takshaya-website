export default function AuthLayout({ left, right }) {
  return (
    <div className="auth-layout">

      <div className="auth-left">
        {left}
      </div>

      <div className="auth-right">
        {right}
      </div>

    </div>
  );
}