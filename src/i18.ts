import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { namespaces } from "@/lang/nameSpaces";
import { FALLBACK_LANGUAGE, Language } from "@/lang/constants";

// resources
// es
import esAccessibility from "@/lang/es/_accessibility.json";
import esPages from "@/lang/es/_pages.json";
// en
import enAccessibility from "@/lang/en/_accessibility.json";
import enPages from "@/lang/en/_pages.json";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: FALLBACK_LANGUAGE,
    supportedLngs: Object.values(Language),
    ns: namespaces,
    defaultNS: "_pages",
    resources: {
      en: {
        _accessibility: enAccessibility,
        _pages: enPages,
      },
      es: {
        _accessibility: esAccessibility,
        _pages: esPages,
      },
    },
  });

// Screen readers and the browser spell checker read the page language
const setDocumentLanguage = (language: string) => {
  document.documentElement.lang = language;
};
i18n.on("languageChanged", setDocumentLanguage);
if (i18n.resolvedLanguage) setDocumentLanguage(i18n.resolvedLanguage);

export default i18n;
