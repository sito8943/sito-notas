import { AppRoute } from "@/shared/routes";

/** App id in sito-feature-usage */
export const FEATURE_USAGE_APP = "notes";

/**
 * Catalogue sent to sito-feature-usage: every feature of Sito Notas, so the
 * ones nobody uses show up. Dotted slugs; only these names are ever sent.
 * Pages are `page.<AppRoute key in snake_case>` (see `toPageFeature`).
 */
export const NOTES_FEATURES = [
  "page.home",
  "page.note",
  "page.tags",
  "page.shared",
  "page.trash",
  "page.settings",
  "page.sign_out",
  "page.auth",
  "page.recovery",
  "page.update_password",
  "page.public_note",
] as const;

/** `AppRoute` keys that are not screens: catch-alls and routes not wired yet */
export const NON_FEATURE_ROUTE_KEYS: readonly (keyof typeof AppRoute)[] = [
  "NotFound",
  "Calendar",
];

/** localStorage key of the user's choice for optional technologies */
export const CONSENT_STORAGE_KEY = "consent_notes";

/**
 * Bump when the consent text or the optional technologies change: stored
 * choices from an older version are asked again.
 */
export const CONSENT_VERSION = 1;

export const AnalyticsConsent = {
  Allowed: "allowed",
  Denied: "denied",
} as const;

export type AnalyticsConsent =
  (typeof AnalyticsConsent)[keyof typeof AnalyticsConsent];
