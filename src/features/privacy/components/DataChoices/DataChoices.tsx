import { useTranslation } from "react-i18next";

// @sito/ui
import { Button } from "@sito/ui";

import { useConsent } from "@/features/privacy/providers/ConsentProvider";

import "./styles.css";

/**
 * Asks before turning on optional technologies. Accept and reject have the
 * same weight; the choice can be changed later in Settings.
 */
function DataChoices() {
  const { t } = useTranslation();
  const { isNoticeOpen, setAnalytics } = useConsent();

  if (!isNoticeOpen) return null;

  return (
    <section
      className="data-choices"
      role="dialog"
      aria-live="polite"
      aria-labelledby="data-choices-title"
      aria-describedby="data-choices-body"
    >
      <div className="data-choices-text">
        <h2 id="data-choices-title" className="data-choices-title">
          {t("_pages:privacy.notice.title")}
        </h2>
        <p id="data-choices-body">{t("_pages:privacy.notice.body")}</p>
      </div>
      <div className="data-choices-actions">
        <Button
          type="button"
          variant="outlined"
          color="primary"
          className="data-choices-button"
          onClick={() => setAnalytics(false)}
        >
          {t("_pages:privacy.notice.reject")}
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          className="data-choices-button"
          onClick={() => setAnalytics(true)}
        >
          {t("_pages:privacy.notice.accept")}
        </Button>
      </div>
    </section>
  );
}

export default DataChoices;
