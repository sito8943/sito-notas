import { fromLocalObject } from "@/shared/lib/storage";

import { USER_STORAGE_KEY } from "@/features/auth/constants";
import type { Account, AuthUser } from "@/features/auth/models";

const isAuthUser = (value: unknown): value is AuthUser => {
  if (typeof value !== "object" || value === null) return false;
  const { id, email } = value as Record<string, unknown>;
  return typeof id === "number" && typeof email === "string";
};

/**
 * Reads the stored user snapshot (older Supabase snapshots are ignored)
 * @returns the stored account, or an empty one
 */
export const readStoredAccount = (): Account => {
  try {
    const stored = fromLocalObject<Account>(USER_STORAGE_KEY);
    return isAuthUser(stored?.user) ? { user: stored.user } : {};
  } catch {
    return {};
  }
};
