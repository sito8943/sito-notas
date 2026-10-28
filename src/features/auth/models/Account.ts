import type { Session, User } from "@supabase/supabase-js";

export interface UserSettings {
  id: string;
  photo?: Record<string, unknown>;
  created_at?: number;
}

export interface Account {
  user?: User | null;
  session?: Session | null;
  settings?: Partial<UserSettings>;
  appUser?: Partial<UserSettings>;
}
