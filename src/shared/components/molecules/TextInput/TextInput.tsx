import { useId } from "react";

import type { TextInputProps } from "./types";

import "./styles.css";

/**
 * Outlined text input with a label that floats up on focus or when filled
 */
function TextInput(props: TextInputProps) {
  const {
    id,
    label,
    helperText,
    error = false,
    required,
    containerClassName = "",
    className = "",
    endAdornment,
    ref,
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  return (
    <div className={`text-input-container ${containerClassName}`}>
      <div className="text-input-field">
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error || undefined}
          aria-describedby={helperId}
          // A blank placeholder lets CSS detect an empty field (:placeholder-shown)
          placeholder=" "
          className={`text-input ${endAdornment ? "has-adornment" : ""} ${
            error ? "is-error" : ""
          } ${className}`}
          {...rest}
        />
        <label htmlFor={inputId} className="text-input-label">
          {label}
          {required ? " *" : ""}
        </label>
        {endAdornment ? (
          <span className="text-input-adornment">{endAdornment}</span>
        ) : null}
      </div>
      {helperText ? (
        <p
          id={helperId}
          className={`text-input-helper-text ${error ? "is-error" : ""}`}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default TextInput;
