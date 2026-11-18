import { FALLBACK_LANGUAGE, Language } from "@/lang/constants";

/**
 * @param language - i18next language ("es", "es-ES"…)
 * @returns the app language it maps to
 */
export const toAppLanguage = (language: string | undefined): Language => {
  const base = language?.split("-")[0];
  return (Object.values(Language) as string[]).includes(base ?? "")
    ? (base as Language)
    : FALLBACK_LANGUAGE;
};
