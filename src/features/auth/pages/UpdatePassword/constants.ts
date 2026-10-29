import { AuthRouteQueryParam } from "@/shared/routes";

/** Time to read the success toast before leaving the screen */
export const SIGN_OUT_DELAY_MS = 2000;

/** Params that may carry the Supabase access token, by priority */
export const ACCESS_TOKEN_PARAMS: readonly string[] = [
  AuthRouteQueryParam.AccessToken,
  AuthRouteQueryParam.AccessTokenLegacy,
  AuthRouteQueryParam.Token,
];
