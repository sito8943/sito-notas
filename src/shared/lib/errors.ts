/**
 * Extracts a readable message from an unknown thrown value
 * @param error - caught value
 * @param fallback - message when the value carries none
 */
export const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error && error.message ? error.message : fallback;
