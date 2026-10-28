import type { TextareaHTMLAttributes } from "react";

import type { FieldBaseProps } from "@/shared/components/molecules/Field";

export type TextareaControlProps = FieldBaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    containerClassName?: string;
  };
