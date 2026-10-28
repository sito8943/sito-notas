import type { InputHTMLAttributes } from "react";

import type { FieldBaseProps } from "@/shared/components/molecules/Field";

export type InputControlProps = FieldBaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    containerClassName?: string;
  };
