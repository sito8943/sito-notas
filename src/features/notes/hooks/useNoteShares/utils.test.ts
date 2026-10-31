import { describe, expect, it } from "vitest";

import { HttpError } from "@/shared/lib/http";

import { getShareErrorKey } from "./utils";

describe("getShareErrorKey", () => {
  it("explains the statuses the share endpoint answers", () => {
    expect(getShareErrorKey(new HttpError(404, "x"))).toBe(
      "_pages:share.errors.notFound",
    );
    expect(getShareErrorKey(new HttpError(400, "x"))).toBe(
      "_pages:share.errors.self",
    );
    expect(getShareErrorKey(new HttpError(409, "x"))).toBe(
      "_pages:share.errors.alreadyShared",
    );
  });

  it("falls back to the generic request errors", () => {
    expect(getShareErrorKey(new HttpError(0, "x"))).toBe(
      "_accessibility:errors.failedToFetch",
    );
    expect(getShareErrorKey(new HttpError(500, "x"))).toBe(
      "_accessibility:errors.unknown",
    );
    expect(getShareErrorKey(new Error("x"))).toBe(
      "_accessibility:errors.unknown",
    );
  });
});
