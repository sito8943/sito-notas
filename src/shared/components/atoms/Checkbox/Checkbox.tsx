import { useId } from "react";

import type { CheckboxProps } from "./types";

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
    <div className={`flex items-center gap-2 ${containerClassName}`}>
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className={`h-4 w-4 cursor-pointer accent-(--color-text-primary) disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        {...rest}
      />
      <label
        htmlFor={inputId}
        className="cursor-pointer select-none text-sm text-(--sito-ui-color-text)"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
