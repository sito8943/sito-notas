import type { InputHTMLAttributes, Ref } from "react";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children"
> & {
  label: string;
  containerClassName?: string;
  ref?: Ref<HTMLInputElement>;
};
