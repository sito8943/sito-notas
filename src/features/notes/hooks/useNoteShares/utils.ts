import { isHttpError } from "@/shared/lib/http";
import { getRequestErrorKey } from "@/shared/lib/errors";

import { SHARE_ERROR_KEYS } from "./constants";

/**
 * @param error - error of the "share" request
 * @returns i18n key of the message to show
 */
export const getShareErrorKey = (error: unknown): string =>
  (isHttpError(error) && SHARE_ERROR_KEYS[error.status]) ||
  getRequestErrorKey(error);
