import { AuthRouteQueryParam } from "@/shared/routes";

import {
  RECOVERY_TOKEN_TYPE,
  type ResetPasswordRequest,
} from "@/features/auth/services";

import { ACCESS_TOKEN_PARAMS } from "./constants";

/**
 * @param hash - location hash ("#a=1" or "#/route?a=1")
 * @returns params found in the hash
 */
const parseHashParams = (hash: string): URLSearchParams => {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  return new URLSearchParams(
    raw.includes("?") ? raw.slice(raw.indexOf("?") + 1) : raw,
  );
};

/**
 * Reads a param from the query string first, then from the hash
 * @returns the non-empty value, or null
 */
const readParam = (
  search: URLSearchParams,
  hash: URLSearchParams,
  key: string,
): string | null => search.get(key) || hash.get(key) || null;

/**
 * Builds the sito-auth reset request from the recovery link the email opened.
 * Supports `token_hash` + `type=recovery` links and links that carry the
 * Supabase session tokens (`access_token` [+ `refresh_token`]).
 * @param hash - location.hash
 * @param search - location.search
 * @param newPassword - password typed by the user
 * @returns the request, or null when the link is missing, invalid or failed
 */
export const getResetPasswordRequest = (
  hash: string,
  search: string,
  newPassword: string,
): ResetPasswordRequest | null => {
  const searchParams = new URLSearchParams(search);
  const hashParams = parseHashParams(hash);
  const read = (key: string) => readParam(searchParams, hashParams, key);

  if (
    read(AuthRouteQueryParam.Error) ||
    read(AuthRouteQueryParam.ErrorDescription)
  )
    return null;

  const tokenHash = read(AuthRouteQueryParam.TokenHash);
  if (tokenHash) {
    const type = read(AuthRouteQueryParam.Type)?.trim().toLowerCase();
    return type === RECOVERY_TOKEN_TYPE
      ? { tokenHash, type: RECOVERY_TOKEN_TYPE, newPassword }
      : null;
  }

  const accessToken = ACCESS_TOKEN_PARAMS.map(read).find(Boolean);
  if (!accessToken) return null;

  const refreshToken = read(AuthRouteQueryParam.RefreshToken);
  return refreshToken
    ? { accessToken, refreshToken, newPassword }
    : { accessToken, newPassword };
};
