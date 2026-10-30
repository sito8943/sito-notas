import { Field } from "@/shared/components/molecules/Field";
import type { TextareaControlProps } from "./types";
import "./styles.css";

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
          className={`field-control textarea-control ${className}`}
          {...rest}
        />
      )}
    </Field>
  );
}

export default TextareaControl;
