import type { ReactNode } from "react";

export interface SplashScreenProps {
  visible?: boolean;
  logo: ReactNode;
  /** Accessible name announced by the loading spinner */
  label?: string;
}
