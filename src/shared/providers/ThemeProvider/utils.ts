import { DEFAULT_THEME_MODE, THEME_STORAGE_KEY, ThemeMode } from "./constants";

const isThemeMode = (value: string | null): value is ThemeMode =>
  Object.values<string | null>(ThemeMode).includes(value);

export const readStoredMode = (): ThemeMode => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(stored) ? stored : DEFAULT_THEME_MODE;
  } catch {
    return DEFAULT_THEME_MODE;
  }
};

export const applyMode = (mode: ThemeMode): void => {
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
