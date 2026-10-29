export const DEFAULT_SESSION_STORAGE_KEY = "sito_notas_session";

/** Refresh the access token this long before it expires */
export const DEFAULT_REFRESH_MARGIN_MS = 60_000;

/** Refresh responses that mean the refresh token is no longer usable */
export const DEFINITIVE_REFRESH_FAILURE_STATUSES: readonly number[] = [
  400, 401,
];

export const SESSION_EXPIRED_MESSAGE = "Session expired";
