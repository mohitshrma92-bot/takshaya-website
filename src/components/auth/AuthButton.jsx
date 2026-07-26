export default function AuthButton({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`auth-button ${variant}`}
      {...props}
    >
      {children}
    </button>
  );
}