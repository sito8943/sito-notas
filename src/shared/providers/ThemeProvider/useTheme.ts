import { useContext } from "react";

import { ThemeContext } from "./ThemeContext";
import type { ThemeContextValue } from "./types";

function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}

export default useTheme;
