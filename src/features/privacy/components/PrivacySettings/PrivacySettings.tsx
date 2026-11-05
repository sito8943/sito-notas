import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// components
import { Select } from "@/shared/components/molecules/Select";

import { AnalyticsConsent } from "@/features/privacy/constants";
import { useConsent } from "@/features/privacy/providers/ConsentProvider";

import "./styles.css";

/**
 * Privacy section: allow or withdraw anonymous usage analytics. Withdrawing
 * must be as easy as giving it, so it applies at once.
 */
function PrivacySettings() {
  const { t } = useTranslation();
  const { analytics, setAnalytics } = useConsent();

  const options = useMemo(
    () =>
      Object.values(AnalyticsConsent).map((value) => ({
        value,
        label: t(`_pages:privacy.settings.values.${value}`),
      })),
    [t],
  );

  return (
    <section className="privacy-settings">
      <h3 className="privacy-settings-title">
        {t("_pages:privacy.settings.title")}
      </h3>
      <div className="privacy-settings-field">
        <span className="privacy-settings-label" aria-hidden>
          {t("_pages:privacy.settings.label")}
        </span>
        <Select
          value={analytics ? AnalyticsConsent.Allowed : AnalyticsConsent.Denied}
          options={options}
          label={t("_pages:privacy.settings.label")}
          onChange={(value) => setAnalytics(value === AnalyticsConsent.Allowed)}
        />
        <p className="privacy-settings-helper">
          {t("_pages:privacy.settings.helper")}
        </p>
      </div>
    </section>
  );
}

export default PrivacySettings;
