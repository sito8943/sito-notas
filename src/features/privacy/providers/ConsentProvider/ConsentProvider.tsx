import { useCallback, useMemo, useState } from "react";

import { CONSENT_STORAGE_KEY } from "@/features/privacy/constants";
import { persistConsent, readStoredConsent } from "@/features/privacy/utils";

import { ConsentContext } from "./ConsentContext";
import type { ConsentContextValue, ConsentProviderProps } from "./types";

/**
 * Consent for optional technologies (today: anonymous feature usage).
 * Essential storage (session, theme, cached notes) does not depend on it.
 */
function ConsentProvider({ children }: ConsentProviderProps) {
  const [analytics, setAnalyticsState] = useState<boolean | null>(
    () => readStoredConsent(CONSENT_STORAGE_KEY)?.analytics ?? null,
  );
  const [reopened, setReopened] = useState(false);

  const setAnalytics = useCallback((allowed: boolean) => {
    persistConsent(CONSENT_STORAGE_KEY, allowed);
    setAnalyticsState(allowed);
    setReopened(false);
  }, []);

  const openNotice = useCallback(() => setReopened(true), []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      analytics,
      isNoticeOpen: analytics === null || reopened,
      setAnalytics,
      openNotice,
    }),
    [analytics, reopened, setAnalytics, openNotice],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export default ConsentProvider;
