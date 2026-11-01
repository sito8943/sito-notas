const { VITE_AUTH_URL, VITE_API_URL, VITE_SHARE_URL } = import.meta.env;

const config = {
  /** sito-auth base URL (accounts, tokens) */
  authUrl: VITE_AUTH_URL ?? "",
  /** Sito Notes API base URL (data) */
  apiUrl: VITE_API_URL ?? "",
  /**
   * Host of share links (`<shareUrl>/<token>`, the API share page with
   * link-preview tags); empty: the API's own `/s` page
   */
  shareUrl: VITE_SHARE_URL ?? "",
};

export default config;
