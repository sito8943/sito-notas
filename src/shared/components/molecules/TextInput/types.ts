import type { InputHTMLAttributes, ReactNode, Ref } from "react";

export type TextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "children"
> & {
  label: string;
  helperText?: string;
  /** Marks the field invalid and paints the helper text as an error */
  error?: boolean;
  containerClassName?: string;
  /** Rendered inside the field, on the right (e.g. a visibility toggle) */
  endAdornment?: ReactNode;
  ref?: Ref<HTMLInputElement>;
};
