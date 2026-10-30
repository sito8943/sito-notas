import { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import { Syncing } from "@/shared/components/atoms/Syncing";

// sections
import { Password } from "@/features/settings/components/Password";

import "./styles.css";

function Settings() {
  const { t } = useTranslation();

  const [sync] = useState(false);

  return (
    <main className="settings">
      <div className="settings-content">
        <div className={`settings-syncing ${sync ? "visible" : ""}`}>
          <Syncing />
        </div>
        <div className="settings-header">
          <h2 className="settings-title">{t("_pages:settings.title")}</h2>
        </div>
        <Password />
      </div>
    </main>
  );
}

export default Settings;
