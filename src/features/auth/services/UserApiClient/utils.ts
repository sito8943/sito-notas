import { getJwtExpiry } from "@/shared/lib/http";
import type { RefreshedTokens } from "@/shared/lib/http";

import type { AuthDto, AuthUser } from "@/features/auth/models";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/**
 * Validates a sito-auth response
 * @param value - parsed response body
 * @returns the typed DTO
 * @throws Error when required fields are missing
 */
export const parseAuthDto = (value: unknown): AuthDto => {
  if (
    !isRecord(value) ||
    typeof value.id !== "number" ||
    typeof value.email !== "string" ||
    typeof value.token !== "string"
  )
    throw new Error("Invalid auth response");

  return {
    id: value.id,
    email: value.email,
    username: typeof value.username === "string" ? value.username : "",
    admin: value.admin === true,
    emailConfirmed: value.emailConfirmed === true,
    token: value.token,
    refreshToken:
      typeof value.refreshToken === "string" ? value.refreshToken : null,
    accessTokenExpiresAt:
      typeof value.accessTokenExpiresAt === "string"
        ? value.accessTokenExpiresAt
        : null,
  };
};

/**
 * @param dto - auth response
 * @returns the user part of the response
 */
export const toAuthUser = (dto: AuthDto): AuthUser => ({
  id: dto.id,
  username: dto.username,
  email: dto.email,
  admin: dto.admin,
  emailConfirmed: dto.emailConfirmed,
});

/**
 * The JWT `exp` claim is absolute; `accessTokenExpiresAt` has no zone, so it
 * is only a fallback.
 * @param dto - auth response
 * @returns tokens for the SessionManager
 */
export const toRefreshedTokens = (dto: AuthDto): RefreshedTokens => {
  const fallback = dto.accessTokenExpiresAt
    ? Date.parse(dto.accessTokenExpiresAt)
    : Number.NaN;
  return {
    accessToken: dto.token,
    refreshToken: dto.refreshToken ?? null,
    accessTokenExpiresAt:
      getJwtExpiry(dto.token) ?? (Number.isNaN(fallback) ? null : fallback),
  };
};
