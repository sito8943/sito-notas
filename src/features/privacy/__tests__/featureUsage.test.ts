import { describe, expect, it } from "vitest";
import { isValidFeature } from "@sito/feature-usage";

import { AppRoute } from "@/shared/routes";
import {
  NON_FEATURE_ROUTE_KEYS,
  NOTES_FEATURES,
} from "@/features/privacy/constants";
import { pageFeatureOf, toPageFeature } from "@/features/privacy/utils";

describe("notes feature usage catalogue", () => {
  it("lists only valid, unique names the service accepts", () => {
    expect(NOTES_FEATURES.every((f) => isValidFeature(f))).toBe(true);
    expect(new Set(NOTES_FEATURES).size).toBe(NOTES_FEATURES.length);
  });

  it("has a page feature for every screen route", () => {
    const pages = Object.keys(AppRoute)
      .filter(
        (key) => !(NON_FEATURE_ROUTE_KEYS as readonly string[]).includes(key),
      )
      .map(toPageFeature);
    const declared = NOTES_FEATURES.filter((f) => f.startsWith("page."));
    expect(pages).toHaveLength(declared.length);
    expect(new Set(pages)).toEqual(new Set(declared));
  });
});

describe("toPageFeature", () => {
  it.each([
    ["Home", "page.home"],
    ["UpdatePassword", "page.update_password"],
    ["PublicNote", "page.public_note"],
  ])("%s → %s", (key, feature) => {
    expect(toPageFeature(key)).toBe(feature);
  });
});

describe("pageFeatureOf", () => {
  it.each([
    ["/", "page.home"],
    ["/note/42", "page.note"],
    ["/tags", "page.tags"],
    ["/trash", "page.trash"],
    ["/auth", "page.auth"],
    ["/auth/recovery", "page.recovery"],
    ["/auth/update-password", "page.update_password"],
    ["/s/abc123", "page.public_note"],
    ["/sign-out", "page.sign_out"],
  ])("%s → %s", (pathname, feature) => {
    expect(pageFeatureOf(pathname)).toBe(feature);
  });

  it("ignores unknown paths, catch-alls and unrouted screens", () => {
    expect(pageFeatureOf("/nope")).toBeNull();
    expect(pageFeatureOf("/note")).toBeNull();
    expect(pageFeatureOf("/calendar")).toBeNull();
  });
});
