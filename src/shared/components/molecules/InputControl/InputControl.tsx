import { CONTROL_CLASSNAME, Field } from "../Field";
import type { InputControlProps } from "./types";

function InputControl(props: InputControlProps) {
  const {
    id,
    label,
    leftComponent,
    rightComponent,
    helperText,
    helperTextClassName,
    containerClassName,
    className = "",
    type = "text",
    ...rest
  } = props;

  return (
    <Field
      id={id}
      label={label}
      leftComponent={leftComponent}
      rightComponent={rightComponent}
      helperText={helperText}
      helperTextClassName={helperTextClassName}
      className={containerClassName}
    >
      {(helperId) => (
        <input
          id={id}
          type={type}
          aria-describedby={helperId}
          aria-invalid={helperText ? true : undefined}
          className={`${CONTROL_CLASSNAME} ${className}`}
          {...rest}
        />
      )}
    </Field>
  );
}

export default InputControl;
