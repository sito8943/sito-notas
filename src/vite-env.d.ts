/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_API_URL: string;
  readonly VITE_THIS_URL: string;
  readonly VITE_LANGUAGE: string;
  readonly VITE_BASIC_KEY: string;
  readonly VITE_ACCEPT_COOKIE: string;
  readonly VITE_DECLINE_COOKIE: string;
  readonly VITE_USER: string;
  readonly VITE_VALIDATION_COOKIE: string;
  readonly VITE_RECOVERING_COOKIE: string;
  readonly VITE_NOTES: string;
  readonly VITE_CRYPTO: string;
  readonly VITE_SUPABASE_CO: string;
  readonly VITE_SUPABASE_ANON: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
