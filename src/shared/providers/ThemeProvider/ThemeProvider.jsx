/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from "react";

import { ThemeContext } from "./ThemeContext";
import { ThemeMode } from "./constants";
import { applyMode, readStoredMode } from "./utils";

function ThemeProvider({ children }) {
  const [mode, setMode] = useState(readStoredMode);

  useEffect(() => {
    applyMode(mode);
  }, [mode]);

  const toggleMode = useCallback(
    () =>
      setMode((current) =>
        current === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark,
      ),
    [],
  );

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, toggleMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
