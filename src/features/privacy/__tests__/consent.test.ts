import { beforeEach, describe, expect, it } from "vitest";

import { CONSENT_VERSION } from "@/features/privacy/constants";
import {
  clearStoredConsent,
  persistConsent,
  readStoredConsent,
} from "@/features/privacy/utils";

const KEY = "consent_test";

describe("consent storage", () => {
  beforeEach(() => localStorage.clear());

  it("has no choice until the user makes one", () => {
    expect(readStoredConsent(KEY)).toBeNull();
  });

  it("stores the choice with its version and date", () => {
    const now = new Date("2026-11-05T10:00:00Z");
    expect(persistConsent(KEY, true, now)).toEqual({
      analytics: true,
      version: CONSENT_VERSION,
      decidedAt: "2026-11-05T10:00:00.000Z",
    });
    expect(readStoredConsent(KEY)?.analytics).toBe(true);
    persistConsent(KEY, false, now);
    expect(readStoredConsent(KEY)?.analytics).toBe(false);
  });

  it("asks again for an older version or a malformed value", () => {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        analytics: true,
        version: CONSENT_VERSION - 1,
        decidedAt: "x",
      }),
    );
    expect(readStoredConsent(KEY)).toBeNull();
    localStorage.setItem(
      KEY,
      JSON.stringify({
        analytics: "yes",
        version: CONSENT_VERSION,
        decidedAt: "x",
      }),
    );
    expect(readStoredConsent(KEY)).toBeNull();
    localStorage.setItem(KEY, "true");
    expect(readStoredConsent(KEY)).toBeNull();
    localStorage.setItem(KEY, "{not json");
    expect(readStoredConsent(KEY)).toBeNull();
  });

  it("clears the choice", () => {
    persistConsent(KEY, true);
    clearStoredConsent(KEY);
    expect(readStoredConsent(KEY)).toBeNull();
  });
});
