export default function AuthButton({
  children,
  type = "button",
}) {
  return (
    <button
      type={type}
      className="auth-button"
    >
      {children}
    </button>
  );
}