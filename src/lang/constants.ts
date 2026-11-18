/** Languages of the app (i18next codes) */
export const Language = {
  Es: "es",
  En: "en",
} as const;

export type Language = (typeof Language)[keyof typeof Language];

export const FALLBACK_LANGUAGE: Language = Language.En;
