import type { ReactNode } from "react";

export interface AuthTemplateProps {
  /** Left side of the top bar (logo / app name) */
  brand: ReactNode;
  /** Right side of the top bar (theme toggle, etc.) */
  actions?: ReactNode;
  children: ReactNode;
}
