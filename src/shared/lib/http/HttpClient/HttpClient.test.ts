import { describe, expect, it, vi } from "vitest";

import { HttpError } from "@/shared/lib/http/HttpError";
import { SessionManager } from "@/shared/lib/http/SessionManager";
import { createMemoryStorage, jsonResponse } from "@/test/http";

import { HttpClient } from "./HttpClient";

const NOW = 1_000_000;
const FRESH = NOW + 15 * 60_000;

const setup = (expiresAt = FRESH) => {
  const session = new SessionManager({
    persistentStorage: createMemoryStorage(),
    volatileStorage: createMemoryStorage(),
    now: () => NOW,
  });
  session.start({
    accessToken: "access-1",
    refreshToken: "refresh-1",
    accessTokenExpiresAt: expiresAt,
    remember: true,
  });
  let refreshCount = 0;
  const refresher = vi.fn(async () => {
    refreshCount += 1;
    await Promise.resolve();
    return {
      accessToken: `access-${refreshCount + 1}`,
      refreshToken: `refresh-${refreshCount + 1}`,
      accessTokenExpiresAt: FRESH,
    };
  });
  session.setRefresher(refresher);
  const fetchFn = vi.fn<typeof fetch>();
  const http = new HttpClient({
    baseUrl: "https://api.test/",
    session,
    fetchFn,
  });
  return { http, session, refresher, fetchFn };
};

const authHeader = (
  fetchFn: ReturnType<typeof vi.fn<typeof fetch>>,
  call = 0,
): string | undefined => {
  const headers = fetchFn.mock.calls[call]?.[1]?.headers as
    Record<string, string> | undefined;
  return headers?.Authorization;
};

describe("HttpClient", () => {
  it("attaches the Bearer token, builds the URL and parses JSON", async () => {
    const { http, fetchFn } = setup();
    fetchFn.mockResolvedValue(jsonResponse(200, { ok: true }));

    await expect(
      http.get("/notes", { query: { page: 0, title: undefined } }),
    ).resolves.toEqual({ ok: true });

    expect(fetchFn.mock.calls[0]?.[0]).toBe("https://api.test/notes?page=0");
    expect(authHeader(fetchFn)).toBe("Bearer access-1");
  });

  it("sends JSON bodies and no token on anonymous requests", async () => {
    const { http, fetchFn } = setup();
    fetchFn.mockResolvedValue(jsonResponse(204));

    await expect(
      http.post("/auth/sign-in", { email: "a@b.c" }, { auth: false }),
    ).resolves.toBeUndefined();

    const init = fetchFn.mock.calls[0]?.[1];
    expect(init?.body).toBe(JSON.stringify({ email: "a@b.c" }));
    expect(authHeader(fetchFn)).toBeUndefined();
  });

  it("refreshes proactively before the token expires", async () => {
    const { http, fetchFn, refresher } = setup(NOW + 10_000);
    fetchFn.mockResolvedValue(jsonResponse(200, []));

    await http.get("/notes");

    expect(refresher).toHaveBeenCalledTimes(1);
    expect(authHeader(fetchFn)).toBe("Bearer access-2");
  });

  it("shares a single refresh between concurrent requests", async () => {
    const { http, fetchFn, refresher } = setup(NOW + 10_000);
    fetchFn.mockImplementation(async () => jsonResponse(200, []));

    await Promise.all([http.get("/a"), http.get("/b"), http.get("/c")]);

    expect(refresher).toHaveBeenCalledTimes(1);
    expect(refresher).toHaveBeenCalledWith("refresh-1");
    fetchFn.mock.calls.forEach((_, index) =>
      expect(authHeader(fetchFn, index)).toBe("Bearer access-2"),
    );
  });

  it("refreshes once and retries concurrent requests that got a 401", async () => {
    const { http, fetchFn, refresher } = setup();
    fetchFn.mockImplementation(async (_url, init) => {
      const headers = init?.headers as Record<string, string> | undefined;
      const auth = headers?.Authorization;
      return auth === "Bearer access-1"
        ? jsonResponse(401, { message: "expired" })
        : jsonResponse(200, { auth });
    });

    const results = await Promise.all([http.get("/a"), http.get("/b")]);

    expect(refresher).toHaveBeenCalledTimes(1);
    expect(results).toEqual([
      { auth: "Bearer access-2" },
      { auth: "Bearer access-2" },
    ]);
  });

  it("retries only once after a 401", async () => {
    const { http, fetchFn } = setup();
    fetchFn.mockImplementation(async () => jsonResponse(401, "nope"));

    await expect(http.get("/a")).rejects.toMatchObject({
      status: 401,
      message: "nope",
    });
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it("clears the session when the refresh after a 401 fails", async () => {
    const { http, fetchFn, refresher, session } = setup();
    const listener = vi.fn();
    session.subscribe(listener);
    refresher.mockRejectedValueOnce(
      new HttpError(400, "Invalid refresh token"),
    );
    fetchFn.mockImplementation(async () => jsonResponse(401));

    await expect(http.get("/a")).rejects.toMatchObject({ status: 400 });
    expect(session.hasSession()).toBe(false);
    expect(listener).toHaveBeenLastCalledWith(null);
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it("fails with 401 without calling the server when signed out", async () => {
    const { http, fetchFn, session } = setup();
    session.clear();

    await expect(http.get("/a")).rejects.toMatchObject({ status: 401 });
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("optional auth sends the token only when signed in", async () => {
    const { http, fetchFn, session } = setup();
    fetchFn.mockImplementation(async () => jsonResponse(200, {}));

    await http.get("/a", { auth: "optional" });
    session.clear();
    await http.get("/a", { auth: "optional" });

    expect(authHeader(fetchFn, 0)).toBe("Bearer access-1");
    expect(authHeader(fetchFn, 1)).toBeUndefined();
  });

  it("maps network failures to status 0", async () => {
    const { http, fetchFn } = setup();
    fetchFn.mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(http.get("/a")).rejects.toMatchObject({
      status: 0,
      message: "Failed to fetch",
    });
  });
});
