import { HttpError, isHttpError } from "@/shared/lib/http/HttpError";
import type { SessionManager } from "@/shared/lib/http/SessionManager";

import {
  HttpMethod,
  NETWORK_ERROR_STATUS,
  NO_SESSION_MESSAGE,
} from "./constants";
import type { HttpClientOptions, RequestOptions } from "./types";
import { buildUrl, getBodyMessage, readBody } from "./utils";

/**
 * JSON fetch wrapper bound to one server. Authenticated requests take the
 * token from the SessionManager (which refreshes it shortly before it
 * expires) and are retried once after a 401 with a refreshed token.
 */
export class HttpClient {
  private readonly baseUrl: string;
  private readonly session: SessionManager | undefined;
  private readonly fetchFn: typeof fetch;

  constructor(options: HttpClientOptions) {
    this.baseUrl = options.baseUrl;
    this.session = options.session;
    this.fetchFn = options.fetchFn ?? ((input, init) => fetch(input, init));
  }

  get<T>(path: string, options?: Omit<RequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: HttpMethod.Get });
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: HttpMethod.Post, body });
  }

  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: HttpMethod.Patch,
      body,
    });
  }

  delete<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: HttpMethod.Delete,
      body,
    });
  }

  /**
   * @param path - path relative to the base URL
   * @param options - request options
   * @returns parsed response body
   * @throws HttpError on non-2xx responses and network failures
   */
  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { auth = true } = options;
    if (!auth || !this.session) return this.send<T>(path, options, null);

    const token = await this.session.getAccessToken();
    if (!token) throw new HttpError(401, NO_SESSION_MESSAGE);

    try {
      return await this.send<T>(path, options, token);
    } catch (error) {
      if (!isHttpError(error, 401)) throw error;
      // Another request may have refreshed already; reuse its token
      const current = this.session.getTokens()?.accessToken;
      const retryToken =
        current && current !== token ? current : await this.session.refresh();
      return this.send<T>(path, options, retryToken);
    }
  }

  private async send<T>(
    path: string,
    options: RequestOptions,
    token: string | null,
  ): Promise<T> {
    const { method = HttpMethod.Get, body, query, headers, signal } = options;

    const requestHeaders: Record<string, string> = {
      Accept: "application/json",
      ...headers,
    };
    if (body !== undefined) requestHeaders["Content-Type"] = "application/json";
    if (token) requestHeaders.Authorization = `Bearer ${token}`;

    let response: Response;
    try {
      response = await this.fetchFn(buildUrl(this.baseUrl, path, query), {
        method,
        headers: requestHeaders,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError")
        throw error;
      throw new HttpError(
        NETWORK_ERROR_STATUS,
        error instanceof Error ? error.message : "Network error",
      );
    }

    const data = await readBody(response);
    if (!response.ok)
      throw new HttpError(
        response.status,
        getBodyMessage(data, response.statusText || `HTTP ${response.status}`),
        data,
      );
    return data as T;
  }
}
