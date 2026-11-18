import { useCallback, useEffect, useMemo, useState } from "react";

import { ThemeContext } from "./ThemeContext";
import { DARK_SCHEME_QUERY, ThemeMode } from "./constants";
import type { ThemeProviderProps } from "./types";
import { applyMode, prefersDark, readStoredMode, resolveMode } from "./utils";

function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(readStoredMode);
  const [systemDark, setSystemDark] = useState(prefersDark);

  const resolvedMode = resolveMode(mode, systemDark);

  // Follow the device setting while it can change the theme
  useEffect(() => {
    if (mode !== ThemeMode.System || typeof window.matchMedia !== "function")
      return;
    const query = window.matchMedia(DARK_SCHEME_QUERY);
    const onChange = () => setSystemDark(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [mode]);

  useEffect(() => {
    applyMode(mode, resolvedMode);
  }, [mode, resolvedMode]);

  // From System too: switch to the opposite of what is shown
  const toggleMode = useCallback(
    () =>
      setMode(
        resolvedMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark,
      ),
    [resolvedMode],
  );

  const value = useMemo(
    () => ({ mode, resolvedMode, setMode, toggleMode }),
    [mode, resolvedMode, toggleMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
