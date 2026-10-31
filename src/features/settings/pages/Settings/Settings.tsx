import { useState } from "react";
import { useTranslation } from "react-i18next";

// routes
import { AppRoute } from "@/shared/routes";

// hooks
import { useGoBack } from "@/shared/hooks";

// components
import { Syncing } from "@/shared/components/atoms/Syncing";
import { PageHeader } from "@/shared/components/molecules/PageHeader";

// sections
import { Password } from "@/features/settings/components/Password";

import "./styles.css";

/** Account settings, with the inner-page header (back + breadcrumb) */
function Settings() {
  const { t } = useTranslation();
  const goBack = useGoBack(AppRoute.Home);

  const [sync] = useState(false);

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
        <div className={`settings-syncing ${sync ? "visible" : ""}`}>
          <Syncing />
        </div>
        <h1 className="settings-title">{t("_pages:settings.title")}</h1>
        <Password />
      </div>
    </main>
  );
}

export default Settings;
