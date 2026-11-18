import { useTranslation } from "react-i18next";

// routes
import { AppRoute } from "@/shared/routes";

// hooks
import { useGoBack } from "@/shared/hooks";

// components
import { PageHeader } from "@/shared/components/molecules/PageHeader";

// sections
import { AccountSettings } from "@/features/settings/components/AccountSettings";
import { AppearanceSettings } from "@/features/settings/components/AppearanceSettings";
import { KeyboardShortcuts } from "@/features/settings/components/KeyboardShortcuts";
import { LanguageSettings } from "@/features/settings/components/LanguageSettings";
import { Password } from "@/features/settings/components/Password";
import { PrivacySettings } from "@/features/privacy";

import "./styles.css";

/** Account settings, with the inner-page header (back + breadcrumb) */
function Settings() {
  const { t } = useTranslation();
  const goBack = useGoBack(AppRoute.Home);

  return (
    <main className="settings">
      <PageHeader
        crumbs={[
          { label: t("_pages:note.notes"), to: AppRoute.Home },
          { label: t("_pages:settings.title") },
        ]}
        onBack={goBack}
        backLabel={t("_accessibility:buttons.back")}
        navLabel={t("_pages:note.breadcrumb")}
      />
      <div className="settings-content">
        <h1 className="settings-title">{t("_pages:settings.title")}</h1>
        <div className="settings-grid">
          <div className="settings-column">
            <AccountSettings />
            <Password />
          </div>
          <div className="settings-column">
            <AppearanceSettings />
            <LanguageSettings />
            <PrivacySettings />
          </div>
          <div className="settings-wide">
            <KeyboardShortcuts />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Settings;
