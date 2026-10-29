import { describe, expect, it } from "vitest";

import { getResetPasswordRequest } from "./utils";

describe("getResetPasswordRequest", () => {
  it("reads token_hash links", () => {
    expect(
      getResetPasswordRequest("", "?token_hash=abc&type=recovery", "secret"),
    ).toEqual({ tokenHash: "abc", type: "recovery", newPassword: "secret" });
  });

  it("rejects token_hash links of another type", () => {
    expect(
      getResetPasswordRequest("", "?token_hash=abc&type=signup", "secret"),
    ).toBeNull();
  });

  it("reads Supabase session tokens from the hash", () => {
    expect(
      getResetPasswordRequest(
        "#access_token=at&refresh_token=rt&type=recovery",
        "",
        "secret",
      ),
    ).toEqual({ accessToken: "at", refreshToken: "rt", newPassword: "secret" });
  });

  it("returns null for error links and links without token", () => {
    expect(
      getResetPasswordRequest("#error=access_denied", "", "secret"),
    ).toBeNull();
    expect(getResetPasswordRequest("", "", "secret")).toBeNull();
  });
});
