import { useTranslation } from "react-i18next";
import type { FallbackProps } from "react-error-boundary";

// @sito/ui
import { Button } from "@sito/ui";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { t } = useTranslation();

  return (
    <div
      role="alert"
      className="w-full h-full flex flex-col items-center justify-center gap-4 p-10"
    >
      <h2 className="text-2xl text-center">
        {t("_accessibility:errors.unknown")}
      </h2>
      {error instanceof Error ? (
        <p className="text-sm opacity-70 text-center">{error.message}</p>
      ) : null}
      <Button variant="submit" color="primary" onClick={resetErrorBoundary}>
        {t("_accessibility:buttons.retry")}
      </Button>
    </div>
  );
}

export default ErrorFallback;
