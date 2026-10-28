import type { InputHTMLAttributes } from "react";

import type { FieldBaseProps } from "../Field";

export type InputControlProps = FieldBaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    containerClassName?: string;
  };
