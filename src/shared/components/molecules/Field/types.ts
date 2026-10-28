import type { ReactNode } from "react";

export interface FieldBaseProps {
  id?: string;
  label?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  helperText?: string;
  helperTextClassName?: string;
}

export interface FieldProps extends FieldBaseProps {
  className?: string;
  /** Receives the helper text id so the control can reference it */
  children: (helperId: string | undefined) => ReactNode;
}
