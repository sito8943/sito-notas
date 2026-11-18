export const THEME_STORAGE_KEY = "theme";

/** Theme chosen by the user; System follows the device setting */
export const ThemeMode = {
  Dark: "dark",
  Light: "light",
  System: "system",
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

/** Theme actually shown (System resolved) */
export type ResolvedThemeMode = Exclude<ThemeMode, typeof ThemeMode.System>;

export const DEFAULT_THEME_MODE: ThemeMode = ThemeMode.Dark;

/** Media query of the device dark setting */
export const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";
