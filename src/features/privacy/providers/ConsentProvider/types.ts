import type { ReactNode } from "react";

export interface ConsentContextValue {
  /** null until the user chooses */
  analytics: boolean | null;
  /** The notice is shown: no choice yet, or the user asked to change it */
  isNoticeOpen: boolean;
  setAnalytics: (allowed: boolean) => void;
  /** Shows the notice again ("change preferences") */
  openNotice: () => void;
}

export interface ConsentProviderProps {
  children: ReactNode;
}
