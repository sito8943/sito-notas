/** "Share" errors the server explains, by HTTP status */
export const SHARE_ERROR_KEYS: Readonly<Record<number, string>> = {
  400: "_pages:share.errors.self",
  404: "_pages:share.errors.notFound",
  409: "_pages:share.errors.alreadyShared",
};
