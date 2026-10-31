import { SOCKET_PATH } from "./constants";

/**
 * @param apiUrl - Notes API base URL (absolute, or a path served by the dev proxy)
 * @param origin - page origin, used when apiUrl is a path
 * @returns ws/wss URL of the STOMP endpoint
 */
export const toSocketUrl = (apiUrl: string, origin: string): string => {
  const url = new URL(apiUrl || "/", origin);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = `${url.pathname.replace(/\/+$/, "")}${SOCKET_PATH}`;
  url.search = "";
  url.hash = "";
  return url.toString();
};

/**
 * @param body - raw frame body
 * @returns parsed JSON, or null when it is not JSON
 */
export const parseSocketBody = (body: string): unknown => {
  try {
    return JSON.parse(body) as unknown;
  } catch {
    return null;
  }
};
