import { isHttpError, NETWORK_ERROR_STATUS } from "@/shared/lib/http";

/**
 * Extracts a readable message from an unknown thrown value
 * @param error - caught value
 * @param fallback - message when the value carries none
 */
export const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error && error.message ? error.message : fallback;

/**
 * Picks a generic, translatable message for a failed request. Server messages
 * can be technical (SQL, stack details), so they only go to the console.
 * @param error - caught value
 * @returns i18n key of the message to show
 */
export const getRequestErrorKey = (error: unknown): string =>
  isHttpError(error, NETWORK_ERROR_STATUS)
    ? "_accessibility:errors.failedToFetch"
    : "_accessibility:errors.unknown";
