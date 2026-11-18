import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { ResolvedThemeMode, ThemeMode } from "./constants";

export interface ThemeContextValue {
  /** Theme chosen by the user */
  mode: ThemeMode;
  /** Theme shown (System resolved to light or dark) */
  resolvedMode: ResolvedThemeMode;
  setMode: Dispatch<SetStateAction<ThemeMode>>;
  toggleMode: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
