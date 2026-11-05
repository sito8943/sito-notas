import { matchPath } from "react-router-dom";

// lib
import { removeFromLocal, toLocal } from "@/shared/lib/storage";
import { AppRoute } from "@/shared/routes";

import {
  CONSENT_VERSION,
  NON_FEATURE_ROUTE_KEYS,
  NOTES_FEATURES,
} from "./constants";
import type { NotesFeature, StoredConsent } from "./types";

const catalogue: ReadonlySet<string> = new Set(NOTES_FEATURES);

/**
 * @param routeKey - `AppRoute` key (`UpdatePassword`)
 * @returns its page feature (`page.update_password`)
 */
export const toPageFeature = (routeKey: string): string =>
  `page.${routeKey.replace(/[A-Z]/g, (char, index: number) =>
    index === 0 ? char.toLowerCase() : `_${char.toLowerCase()}`,
  )}`;

export const isNotesFeature = (feature: string): feature is NotesFeature =>
  catalogue.has(feature);

/**
 * @param pathname - current location pathname
 * @returns the page feature of the screen, or null when it is not a known one
 */
export const pageFeatureOf = (pathname: string): NotesFeature | null => {
  for (const [key, path] of Object.entries(AppRoute)) {
    if ((NON_FEATURE_ROUTE_KEYS as readonly string[]).includes(key)) continue;
    if (!matchPath({ path, end: true }, pathname)) continue;
    const feature = toPageFeature(key);
    return isNotesFeature(feature) ? feature : null;
  }
  return null;
};

const parseStored = (raw: string | null): unknown => {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
};

/**
 * @param storageKey - localStorage key
 * @returns the stored choice, or null when there is none (or it is from an
 * older version, or malformed)
 */
export const readStoredConsent = (storageKey: string): StoredConsent | null => {
  const stored = parseStored(localStorage.getItem(storageKey));
  if (typeof stored !== "object" || stored === null) return null;
  const { analytics, version, decidedAt } = stored as Record<string, unknown>;
  if (
    typeof analytics !== "boolean" ||
    version !== CONSENT_VERSION ||
    typeof decidedAt !== "string"
  )
    return null;
  return { analytics, version, decidedAt };
};

/**
 * @param storageKey - localStorage key
 * @param analytics - whether anonymous usage analytics is allowed
 * @param now - date of the choice
 * @returns the stored choice
 */
export const persistConsent = (
  storageKey: string,
  analytics: boolean,
  now: Date = new Date(),
): StoredConsent => {
  const consent: StoredConsent = {
    analytics,
    version: CONSENT_VERSION,
    decidedAt: now.toISOString(),
  };
  toLocal(storageKey, consent);
  return consent;
};

export const clearStoredConsent = (storageKey: string): void =>
  removeFromLocal(storageKey);
