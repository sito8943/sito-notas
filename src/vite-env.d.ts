/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_SHARE_URL?: string;
  readonly VITE_USAGE_URL?: string;
  readonly VITE_USAGE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
