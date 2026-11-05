import { useLocation } from "react-router-dom";

// @sito/feature-usage
import { useTrackPage } from "@sito/feature-usage/react";

import type { NotesFeature } from "@/features/privacy/types";
import { pageFeatureOf } from "@/features/privacy/utils";

/** Counts one use of the current screen each time the route changes */
function PageUsageTracker() {
  const { pathname } = useLocation();
  useTrackPage<NotesFeature>(pageFeatureOf(pathname));
  return null;
}

export default PageUsageTracker;
