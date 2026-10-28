import type { TextareaHTMLAttributes } from "react";

import type { FieldBaseProps } from "../Field";

export type TextareaControlProps = FieldBaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    containerClassName?: string;
  };
