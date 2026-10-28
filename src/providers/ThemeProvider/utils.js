import { DEFAULT_THEME_MODE, THEME_STORAGE_KEY, ThemeMode } from "./constants";

export const readStoredMode = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return Object.values(ThemeMode).includes(stored)
      ? stored
      : DEFAULT_THEME_MODE;
  } catch {
    return DEFAULT_THEME_MODE;
  }
};

export const applyMode = (mode) => {
  document.documentElement.classList.toggle(
    ThemeMode.Dark,
    mode === ThemeMode.Dark,
  );
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // storage unavailable (private mode): keep the in-memory mode only
  }
};
