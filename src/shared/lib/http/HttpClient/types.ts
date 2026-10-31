import type { SessionManager } from "@/shared/lib/http/SessionManager";

import type { HttpMethod } from "./constants";

export type QueryValue = string | number | boolean | null | undefined;

export type QueryParams = Record<string, QueryValue>;

export interface HttpClientOptions {
  baseUrl: string;
  /** Source of Bearer tokens; requests are anonymous without it */
  session?: SessionManager;
  /** Injectable for tests (default: global fetch) */
  fetchFn?: typeof fetch;
}

export interface RequestOptions {
  method?: HttpMethod;
  /** Sent as JSON */
  body?: unknown;
  query?: QueryParams;
  /**
   * Attach the Bearer token, refresh it and retry once after a 401
   * (default: true). "optional" attaches it only when there is a session.
   */
  auth?: boolean | "optional";
  headers?: Record<string, string>;
  signal?: AbortSignal;
}
