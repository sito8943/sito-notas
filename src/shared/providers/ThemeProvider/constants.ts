export const THEME_STORAGE_KEY = "theme";

export const ThemeMode = {
  Dark: "dark",
  Light: "light",
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

export const DEFAULT_THEME_MODE: ThemeMode = ThemeMode.Dark;
