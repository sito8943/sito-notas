import {
  DARK_SCHEME_QUERY,
  DEFAULT_THEME_MODE,
  THEME_STORAGE_KEY,
  ThemeMode,
  type ResolvedThemeMode,
} from "./constants";

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

/** @returns whether the device prefers a dark theme */
export const prefersDark = (): boolean =>
  typeof window.matchMedia === "function" &&
  window.matchMedia(DARK_SCHEME_QUERY).matches;

/**
 * @param mode - chosen theme
 * @param systemDark - device prefers dark
 * @returns the theme to show
 */
export const resolveMode = (
  mode: ThemeMode,
  systemDark: boolean,
): ResolvedThemeMode => {
  if (mode !== ThemeMode.System) return mode;
  return systemDark ? ThemeMode.Dark : ThemeMode.Light;
};

/**
 * Shows the theme and stores the user's choice.
 * @param mode - chosen theme (stored as is, System included)
 * @param resolved - theme to show
 */
export const applyMode = (
  mode: ThemeMode,
  resolved: ResolvedThemeMode,
): void => {
  document.documentElement.classList.toggle(
    ThemeMode.Dark,
    resolved === ThemeMode.Dark,
  );
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // storage unavailable (private mode): keep the in-memory mode only
  }
};
