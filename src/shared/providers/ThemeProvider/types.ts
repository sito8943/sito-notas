import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { ThemeMode } from "./constants";

export interface ThemeContextValue {
  mode: ThemeMode;
  setMode: Dispatch<SetStateAction<ThemeMode>>;
  toggleMode: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
