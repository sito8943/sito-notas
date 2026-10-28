import { CONTROL_CLASSNAME, Field } from "../Field";
import type { TextareaControlProps } from "./types";

function TextareaControl(props: TextareaControlProps) {
  const {
    id,
    label,
    leftComponent,
    rightComponent,
    helperText,
    helperTextClassName,
    containerClassName,
    className = "",
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
        <textarea
          id={id}
          aria-describedby={helperId}
          aria-invalid={helperText ? true : undefined}
          className={`${CONTROL_CLASSNAME} resize-none ${className}`}
          {...rest}
        />
      )}
    </Field>
  );
}

export default TextareaControl;
