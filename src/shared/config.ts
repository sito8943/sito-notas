const { VITE_AUTH_URL, VITE_API_URL } = import.meta.env;

const config = {
  /** sito-auth base URL (accounts, tokens) */
  authUrl: VITE_AUTH_URL ?? "",
  /** Sito Notes API base URL (data) */
  apiUrl: VITE_API_URL ?? "",
};

export default config;
