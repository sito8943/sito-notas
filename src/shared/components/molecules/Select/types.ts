import type { ReactNode } from "react";

import type { SelectPlacement } from "./constants";

export type SelectPlacementValue =
  (typeof SelectPlacement)[keyof typeof SelectPlacement];

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

export interface SelectProps<T extends string> {
  value: T;
  options: readonly SelectOption<T>[];
  onChange: (value: T) => void;
  /** Accessible name; read before the current value */
  label: string;
  /** Leading icon inside the trigger */
  icon?: ReactNode;
  /** Where the list opens relative to the trigger */
  placement?: SelectPlacementValue;
  disabled?: boolean;
  className?: string;
}
