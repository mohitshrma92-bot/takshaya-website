import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthInput({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  onBlur,
  error = "",
  required = false,
  autoComplete,
  minLength,
  maxLength,
  name,
  disabled = false,
}) {
  const id = useId();

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const inputType =
    isPassword && showPassword
      ? "text"
      : type;

  return (
    <div className="auth-input-group">

      <label htmlFor={id}>
        {label}

        {required && (
          <span aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>

      <div className="auth-input-wrap">

        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${id}-error`
              : undefined
          }
          className={
            error
              ? "auth-input-error"
              : ""
          }
        />

        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowPassword(
                (visible) => !visible
              )
            }
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            title={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}

      </div>

      {error && (
        <div
          id={`${id}-error`}
          className="field-error"
          role="alert"
        >
          {error}
        </div>
      )}

    </div>
  );
}