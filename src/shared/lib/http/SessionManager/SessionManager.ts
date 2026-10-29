import { HttpError, isHttpError } from "@/shared/lib/http/HttpError";

import {
  DEFAULT_REFRESH_MARGIN_MS,
  DEFAULT_SESSION_STORAGE_KEY,
  DEFINITIVE_REFRESH_FAILURE_STATUSES,
  SESSION_EXPIRED_MESSAGE,
} from "./constants";
import type {
  SessionListener,
  SessionManagerOptions,
  SessionRefresher,
  SessionStorageLike,
  SessionTokens,
} from "./types";
import { parseStoredSession } from "./utils";

/**
 * Owns the access/refresh tokens: storage, expiry checks and refresh.
 * Refresh is single-flight: concurrent callers share one request, because
 * refresh tokens rotate and the old one is revoked on use.
 */
export class SessionManager {
  private refresher: SessionRefresher | undefined;
  private readonly storageKey: string;
  private readonly persistentStorage: SessionStorageLike;
  private readonly volatileStorage: SessionStorageLike;
  private readonly refreshMarginMs: number;
  private readonly now: () => number;
  private readonly listeners = new Set<SessionListener>();
  private inflightRefresh: Promise<string> | null = null;

  constructor(options: SessionManagerOptions = {}) {
    this.refresher = options.refresher;
    this.storageKey = options.storageKey ?? DEFAULT_SESSION_STORAGE_KEY;
    this.persistentStorage = options.persistentStorage ?? window.localStorage;
    this.volatileStorage = options.volatileStorage ?? window.sessionStorage;
    this.refreshMarginMs = options.refreshMarginMs ?? DEFAULT_REFRESH_MARGIN_MS;
    this.now = options.now ?? Date.now;
  }

  /** @param refresher - function that calls the identity server */
  setRefresher(refresher: SessionRefresher): void {
    this.refresher = refresher;
  }

  /**
   * Reads storage on every call so tabs see each other's rotated tokens
   * @returns current tokens, or null when signed out
   */
  getTokens(): SessionTokens | null {
    return (
      parseStoredSession(this.persistentStorage.getItem(this.storageKey)) ??
      parseStoredSession(this.volatileStorage.getItem(this.storageKey))
    );
  }

  /** @returns whether there are stored tokens */
  hasSession(): boolean {
    return this.getTokens() !== null;
  }

  /** @param tokens - tokens to store */
  start(tokens: SessionTokens): void {
    const target = tokens.remember
      ? this.persistentStorage
      : this.volatileStorage;
    const other = tokens.remember
      ? this.volatileStorage
      : this.persistentStorage;
    other.removeItem(this.storageKey);
    target.setItem(this.storageKey, JSON.stringify(tokens));
    this.notify(tokens);
  }

  /** Removes the tokens and tells listeners the session ended */
  clear(): void {
    const hadSession = this.hasSession();
    this.persistentStorage.removeItem(this.storageKey);
    this.volatileStorage.removeItem(this.storageKey);
    if (hadSession) this.notify(null);
  }

  /**
   * @param listener - called on every session change
   * @returns unsubscribe function
   */
  subscribe(listener: SessionListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Returns a usable access token, refreshing it first when it is about to
   * expire. Clears the session when it expired and cannot be refreshed.
   * @returns access token, or null when signed out
   */
  async getAccessToken(): Promise<string | null> {
    const tokens = this.getTokens();
    if (!tokens) return null;

    const expiresAt = tokens.accessTokenExpiresAt;
    if (expiresAt === null) return tokens.accessToken;

    const now = this.now();
    if (now < expiresAt - this.refreshMarginMs) return tokens.accessToken;

    if (tokens.refreshToken) return this.refresh();
    if (now < expiresAt) return tokens.accessToken;

    this.clear();
    return null;
  }

  /**
   * Exchanges the refresh token for new tokens. Concurrent calls share the
   * same request. Clears the session when the server rejects the token.
   * @returns the new access token
   */
  refresh(): Promise<string> {
    this.inflightRefresh ??= this.runRefresh().finally(() => {
      this.inflightRefresh = null;
    });
    return this.inflightRefresh;
  }

  private async runRefresh(): Promise<string> {
    const tokens = this.getTokens();
    if (!tokens?.refreshToken || !this.refresher) {
      this.clear();
      throw new HttpError(401, SESSION_EXPIRED_MESSAGE);
    }

    const usedRefreshToken = tokens.refreshToken;
    try {
      const next = await this.refresher(usedRefreshToken);
      this.start({ ...next, remember: tokens.remember });
      return next.accessToken;
    } catch (error) {
      if (!isHttpError(error, ...DEFINITIVE_REFRESH_FAILURE_STATUSES))
        throw error;
      // Another tab may have rotated the token meanwhile: adopt its tokens
      const latest = this.getTokens();
      if (latest?.refreshToken && latest.refreshToken !== usedRefreshToken)
        return latest.accessToken;
      this.clear();
      throw error;
    }
  }

  private notify(tokens: SessionTokens | null): void {
    this.listeners.forEach((listener) => listener(tokens));
  }
}
