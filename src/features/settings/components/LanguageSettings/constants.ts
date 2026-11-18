import { Language } from "@/lang/constants";

/** Each language in its own words, so anyone finds theirs */
export const LANGUAGE_NAMES: Record<Language, string> = {
  [Language.Es]: "Español",
  [Language.En]: "English",
};

/** Options of the language select */
export const LANGUAGE_OPTIONS = Object.values(Language).map((value) => ({
  value,
  label: LANGUAGE_NAMES[value],
}));
