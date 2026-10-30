import { useTranslation } from "react-i18next";
import type { FallbackProps } from "react-error-boundary";

// @sito/ui
import { Button } from "@sito/ui";

import "./styles.css";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { t } = useTranslation();

  return (
    <div role="alert" className="error-fallback">
      <h2 className="error-fallback-title">
        {t("_accessibility:errors.unknown")}
      </h2>
      {error instanceof Error ? (
        <p className="error-fallback-message">{error.message}</p>
      ) : null}
      <Button variant="submit" color="primary" onClick={resetErrorBoundary}>
        {t("_accessibility:buttons.retry")}
      </Button>
    </div>
  );
}

export default ErrorFallback;
