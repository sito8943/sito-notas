import type { FeatureOf } from "@sito/feature-usage";

import type { NOTES_FEATURES } from "./constants";

export type NotesFeature = FeatureOf<typeof NOTES_FEATURES>;

/** The user's choice for optional, non-essential technologies */
export interface StoredConsent {
  /** Anonymous feature usage counts (sito-feature-usage) */
  analytics: boolean;
  version: number;
  /** ISO date of the choice, kept as proof of consent */
  decidedAt: string;
}
