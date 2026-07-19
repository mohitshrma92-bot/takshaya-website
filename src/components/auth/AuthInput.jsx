export default function AuthInput({
  label,
  type = "text",
  placeholder = "",
}) {
  return (
    <div className="auth-input-group">

      <label>
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
      />

    </div>
  );
}