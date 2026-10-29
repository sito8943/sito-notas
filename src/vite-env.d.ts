/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_CO: string;
  readonly VITE_SUPABASE_ANON: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
