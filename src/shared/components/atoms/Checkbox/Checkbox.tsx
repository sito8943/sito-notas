import { useId } from "react";

import type { CheckboxProps } from "./types";
import "./styles.css";

/**
 * Native checkbox with a clickable label
 */
function Checkbox(props: CheckboxProps) {
  const {
    id,
    label,
    containerClassName = "",
    className = "",
    ref,
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={`checkbox ${containerClassName}`}>
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className={`checkbox-input ${className}`}
        {...rest}
      />
      <label htmlFor={inputId} className="checkbox-label">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
