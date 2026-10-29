export const HttpMethod = {
  Get: "GET",
  Post: "POST",
  Patch: "PATCH",
  Put: "PUT",
  Delete: "DELETE",
} as const;

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

/** Status used for requests that never got a response (offline, CORS, DNS) */
export const NETWORK_ERROR_STATUS = 0;

export const NO_SESSION_MESSAGE = "No active session";
