import { describe, expect, it, vi } from "vitest";

import { HttpError } from "@/shared/lib/http/HttpError";
import { createMemoryStorage } from "@/test/http";

import { SessionManager } from "./SessionManager";
import type { SessionTokens } from "./types";

const NOW = 1_000_000;

const setup = (tokens?: Partial<SessionTokens>) => {
  const persistentStorage = createMemoryStorage();
  const volatileStorage = createMemoryStorage();
  const refresher = vi.fn();
  const session = new SessionManager({
    persistentStorage,
    volatileStorage,
    refresher,
    now: () => NOW,
  });
  if (tokens)
    session.start({
      accessToken: "access-1",
      refreshToken: "refresh-1",
      accessTokenExpiresAt: NOW + 15 * 60_000,
      remember: true,
      ...tokens,
    });
  return { session, refresher, persistentStorage, volatileStorage };
};

describe("SessionManager", () => {
  it("stores remembered sessions in persistent storage only", () => {
    const { session, persistentStorage, volatileStorage } = setup({
      remember: true,
    });
    expect(persistentStorage.data.size).toBe(1);
    expect(volatileStorage.data.size).toBe(0);
    expect(session.getTokens()?.accessToken).toBe("access-1");
  });

  it("stores non-remembered sessions in volatile storage only", () => {
    const { persistentStorage, volatileStorage } = setup({ remember: false });
    expect(persistentStorage.data.size).toBe(0);
    expect(volatileStorage.data.size).toBe(1);
  });

  it("returns the stored token while it is fresh", async () => {
    const { session, refresher } = setup({});
    await expect(session.getAccessToken()).resolves.toBe("access-1");
    expect(refresher).not.toHaveBeenCalled();
  });

  it("refreshes proactively shortly before expiry and keeps remember", async () => {
    const { session, refresher } = setup({
      accessTokenExpiresAt: NOW + 30_000,
    });
    refresher.mockResolvedValue({
      accessToken: "access-2",
      refreshToken: "refresh-2",
      accessTokenExpiresAt: NOW + 15 * 60_000,
    });

    await expect(session.getAccessToken()).resolves.toBe("access-2");
    expect(refresher).toHaveBeenCalledWith("refresh-1");
    expect(session.getTokens()).toMatchObject({
      refreshToken: "refresh-2",
      remember: true,
    });
  });

  it("shares one refresh between concurrent callers", async () => {
    const { session, refresher } = setup({});
    let resolve: (value: unknown) => void = () => {};
    refresher.mockReturnValue(new Promise((r) => (resolve = r)));

    const calls = [session.refresh(), session.refresh(), session.refresh()];
    resolve({
      accessToken: "access-2",
      refreshToken: "refresh-2",
      accessTokenExpiresAt: null,
    });

    await expect(Promise.all(calls)).resolves.toEqual([
      "access-2",
      "access-2",
      "access-2",
    ]);
    expect(refresher).toHaveBeenCalledTimes(1);
  });

  it("clears the session and notifies when the refresh token is rejected", async () => {
    const { session, refresher } = setup({});
    const listener = vi.fn();
    session.subscribe(listener);
    refresher.mockRejectedValue(new HttpError(400, "Invalid refresh token"));

    await expect(session.refresh()).rejects.toMatchObject({ status: 400 });
    expect(session.getTokens()).toBeNull();
    expect(listener).toHaveBeenLastCalledWith(null);
  });

  it("keeps the session when the refresh fails for network reasons", async () => {
    const { session, refresher } = setup({});
    refresher.mockRejectedValue(new HttpError(0, "Failed to fetch"));

    await expect(session.refresh()).rejects.toMatchObject({ status: 0 });
    expect(session.getTokens()?.refreshToken).toBe("refresh-1");
  });

  it("adopts tokens rotated by another tab instead of signing out", async () => {
    const { session, refresher } = setup({});
    refresher.mockImplementation(async () => {
      // Another tab rotated the token while this request was in flight
      session.start({
        accessToken: "access-tab",
        refreshToken: "refresh-tab",
        accessTokenExpiresAt: null,
        remember: true,
      });
      throw new HttpError(400, "Invalid refresh token");
    });

    await expect(session.refresh()).resolves.toBe("access-tab");
    expect(session.getTokens()?.refreshToken).toBe("refresh-tab");
  });

  it("clears an expired session that has no refresh token", async () => {
    const { session } = setup({
      refreshToken: null,
      accessTokenExpiresAt: NOW - 1,
    });
    await expect(session.getAccessToken()).resolves.toBeNull();
    expect(session.hasSession()).toBe(false);
  });

  it("uses a token without refresh token until it expires", async () => {
    const { session } = setup({
      refreshToken: null,
      accessTokenExpiresAt: NOW + 10_000,
    });
    await expect(session.getAccessToken()).resolves.toBe("access-1");
  });
});
