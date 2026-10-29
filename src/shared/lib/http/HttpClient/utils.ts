import type { QueryParams } from "./types";

/**
 * @param baseUrl - server base URL, with or without trailing slash
 * @param path - path starting with or without "/"
 * @param query - query params; null/undefined values are skipped
 * @returns full URL
 */
export const buildUrl = (
  baseUrl: string,
  path: string,
  query?: QueryParams,
): string => {
  const base = baseUrl.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const search = new URLSearchParams();
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) search.set(key, String(value));
  });
  const queryString = search.toString();
  return `${base}${cleanPath}${queryString ? `?${queryString}` : ""}`;
};

/**
 * @param response - fetch response
 * @returns parsed JSON, raw text, or undefined for empty bodies
 */
export const readBody = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

/**
 * @param body - parsed error body
 * @param fallback - message when the body carries none
 * @returns readable error message
 */
export const getBodyMessage = (body: unknown, fallback: string): string => {
  if (typeof body === "string" && body.trim()) return body;
  if (typeof body === "object" && body !== null) {
    const { message, error } = body as Record<string, unknown>;
    if (typeof message === "string" && message) return message;
    if (typeof error === "string" && error) return error;
  }
  return fallback;
};
