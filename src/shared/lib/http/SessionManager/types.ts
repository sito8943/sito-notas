export interface SessionTokens {
  accessToken: string;
  /** Present only when the user chose "remember me" (or after a refresh) */
  refreshToken: string | null;
  /** Epoch milliseconds when the access token expires; null when unknown */
  accessTokenExpiresAt: number | null;
  /** Keep the session after the browser closes */
  remember: boolean;
}

/** Tokens returned by the identity server; `remember` is kept from the session */
export type RefreshedTokens = Omit<SessionTokens, "remember">;

/** Exchanges a refresh token for new tokens. Refresh tokens rotate. */
export type SessionRefresher = (
  refreshToken: string,
) => Promise<RefreshedTokens>;

/** Called with the new tokens, or null when the session is cleared */
export type SessionListener = (tokens: SessionTokens | null) => void;

export type SessionStorageLike = Pick<
  Storage,
  "getItem" | "setItem" | "removeItem"
>;

export interface SessionManagerOptions {
  /** Can also be set later with `setRefresher` */
  refresher?: SessionRefresher;
  storageKey?: string;
  /** Used when `remember` is true (default: localStorage) */
  persistentStorage?: SessionStorageLike;
  /** Used when `remember` is false (default: sessionStorage) */
  volatileStorage?: SessionStorageLike;
  /** Refresh this long before the access token expires */
  refreshMarginMs?: number;
  /** Clock, injectable for tests */
  now?: () => number;
}
