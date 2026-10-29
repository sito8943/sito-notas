import type { SessionTokens } from "./types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/**
 * Validates a stored session
 * @param raw - raw storage value
 * @returns the session, or null when missing or malformed
 */
export const parseStoredSession = (
  raw: string | null | undefined,
): SessionTokens | null => {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || typeof value.accessToken !== "string") return null;
    return {
      accessToken: value.accessToken,
      refreshToken:
        typeof value.refreshToken === "string" ? value.refreshToken : null,
      accessTokenExpiresAt:
        typeof value.accessTokenExpiresAt === "number"
          ? value.accessTokenExpiresAt
          : null,
      remember: value.remember === true,
    };
  } catch {
    return null;
  }
};

/**
 * Reads the `exp` claim of a JWT without verifying it
 * @param token - JWT
 * @returns expiry in epoch milliseconds, or null when unreadable
 */
export const getJwtExpiry = (token: string): number | null => {
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const claims: unknown = JSON.parse(atob(padded));
    return isRecord(claims) && typeof claims.exp === "number"
      ? claims.exp * 1000
      : null;
  } catch {
    return null;
  }
};
