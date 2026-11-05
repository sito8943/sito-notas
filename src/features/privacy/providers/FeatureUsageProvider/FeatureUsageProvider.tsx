import { useEffect, useMemo, useRef } from "react";

// @sito/feature-usage
import { createTracker, noopTracker } from "@sito/feature-usage";
import type { Tracker } from "@sito/feature-usage";
import { FeatureUsageProvider as BaseFeatureUsageProvider } from "@sito/feature-usage/react";

// config
import config from "@/shared/config";

import {
  FEATURE_USAGE_APP,
  NOTES_FEATURES,
} from "@/features/privacy/constants";
import { useConsent } from "@/features/privacy/providers/ConsentProvider";
import type { NotesFeature } from "@/features/privacy/types";

import type { FeatureUsageProviderProps } from "./types";

/**
 * Anonymous feature usage (sito-feature-usage): counts which screens are
 * used, never who uses them. Off without VITE_USAGE_URL, and until the user
 * accepts it in the privacy notice.
 */
function FeatureUsageProvider({ children }: FeatureUsageProviderProps) {
  const { analytics } = useConsent();
  const allowed = analytics === true;

  const tracker = useMemo<Tracker<NotesFeature>>(
    () =>
      allowed
        ? createTracker({
            app: FEATURE_USAGE_APP,
            key: config.usage.key,
            endpoint: config.usage.url,
            features: NOTES_FEATURES,
          })
        : noopTracker<NotesFeature>(),
    [allowed],
  );

  // Stop the tracker it replaces; on withdrawal, also forget what it kept.
  // Not done in an effect cleanup: StrictMode's extra run would stop the
  // live tracker.
  const previous = useRef<Tracker<NotesFeature> | null>(null);
  useEffect(() => {
    const replaced = previous.current;
    previous.current = tracker;
    if (!replaced || replaced === tracker) return;
    replaced.stop();
    if (!allowed) replaced.clear();
  }, [tracker, allowed]);

  return (
    <BaseFeatureUsageProvider tracker={tracker}>
      {children}
    </BaseFeatureUsageProvider>
  );
}

export default FeatureUsageProvider;
