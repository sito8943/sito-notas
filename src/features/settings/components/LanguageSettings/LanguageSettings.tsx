import { useTranslation } from "react-i18next";

// components
import { Select } from "@/shared/components/molecules/Select";

// features
import { SettingsSection } from "@/features/settings/components/SettingsSection";

import { LANGUAGE_OPTIONS } from "./constants";
import { toAppLanguage } from "./utils";

/** Language section; the choice is kept in this browser */
function LanguageSettings() {
  const { t, i18n } = useTranslation();

  return (
    <SettingsSection
      title={t("_pages:settings.sections.language.title")}
      helper={t("_pages:settings.sections.language.helper")}
    >
      <Select
        value={toAppLanguage(i18n.resolvedLanguage)}
        options={LANGUAGE_OPTIONS}
        label={t("_pages:settings.sections.language.label")}
        onChange={(language) => void i18n.changeLanguage(language)}
      />
    </SettingsSection>
  );
}

export default LanguageSettings;
