import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// components
import { Select } from "@/shared/components/molecules/Select";

// providers
import { ThemeMode, useTheme } from "@/shared/providers/ThemeProvider";

// features
import { SettingsSection } from "@/features/settings/components/SettingsSection";

/** Appearance section: light, dark or the device theme */
function AppearanceSettings() {
  const { t } = useTranslation();
  const { mode, setMode } = useTheme();

  const options = useMemo(
    () =>
      Object.values(ThemeMode).map((value) => ({
        value,
        label: t(`_pages:settings.sections.appearance.values.${value}`),
      })),
    [t],
  );

  return (
    <SettingsSection
      title={t("_pages:settings.sections.appearance.title")}
      helper={t("_pages:settings.sections.appearance.helper")}
    >
      <Select
        value={mode}
        options={options}
        label={t("_pages:settings.sections.appearance.label")}
        onChange={setMode}
      />
    </SettingsSection>
  );
}

export default AppearanceSettings;
