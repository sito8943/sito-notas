const { VITE_SUPABASE_CO, VITE_SUPABASE_ANON } = import.meta.env;

const config = {
  supabaseCO: VITE_SUPABASE_CO,
  supabaseANON: VITE_SUPABASE_ANON,
};

export default config;
