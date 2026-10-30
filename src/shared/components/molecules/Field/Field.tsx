import type { FieldProps } from "./types";
import "./styles.css";

function Field(props: FieldProps) {
  const {
    id,
    label,
    leftComponent,
    rightComponent,
    helperText,
    helperTextClassName = "",
    className = "",
    children,
  } = props;

  const helperId = id && helperText ? `${id}-helper` : undefined;

  return (
    <div className={`field ${className}`}>
      {label ? (
        <label htmlFor={id} className="field-label">
          {label}
        </label>
      ) : null}
      <div className="field-box">
        {leftComponent ? (
          <span className="field-adornment-left">{leftComponent}</span>
        ) : null}
        {children(helperId)}
        {rightComponent ? (
          <span className="field-adornment-right">{rightComponent}</span>
        ) : null}
      </div>
      {helperText ? (
        <p id={helperId} className={`field-helper-text ${helperTextClassName}`}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default Field;
