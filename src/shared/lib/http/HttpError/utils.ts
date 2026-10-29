import { HttpError } from "./HttpError";

/**
 * @param error - caught value
 * @param statuses - statuses to match; any status when omitted
 * @returns whether the value is an HttpError with one of the statuses
 */
export const isHttpError = (
  error: unknown,
  ...statuses: number[]
): error is HttpError =>
  error instanceof HttpError &&
  (statuses.length === 0 || statuses.includes(error.status));
