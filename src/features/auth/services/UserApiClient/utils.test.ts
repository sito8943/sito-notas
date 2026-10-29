import { describe, expect, it } from "vitest";

import { makeJwt } from "@/test/http";

import { parseAuthDto, toAuthUser, toRefreshedTokens } from "./utils";

const raw = {
  id: 3,
  username: "sito",
  email: "sito@test.dev",
  admin: false,
  emailConfirmed: true,
  token: makeJwt(2_000_000_000),
  refreshToken: "refresh",
  accessTokenExpiresAt: "2033-05-18T03:33:20",
};

describe("UserApiClient utils", () => {
  it("parses an AuthDto and splits user and tokens", () => {
    const dto = parseAuthDto(raw);
    expect(toAuthUser(dto)).toEqual({
      id: 3,
      username: "sito",
      email: "sito@test.dev",
      admin: false,
      emailConfirmed: true,
    });
    expect(toRefreshedTokens(dto)).toEqual({
      accessToken: raw.token,
      refreshToken: "refresh",
      accessTokenExpiresAt: 2_000_000_000_000,
    });
  });

  it("has no refresh token when sign-in did not remember", () => {
    const { refreshToken: _omitted, ...withoutRefresh } = raw;
    expect(
      toRefreshedTokens(parseAuthDto(withoutRefresh)).refreshToken,
    ).toBeNull();
  });

  it("rejects responses without token", () => {
    expect(() => parseAuthDto({ id: 1, email: "a@b.c" })).toThrow();
  });
});
