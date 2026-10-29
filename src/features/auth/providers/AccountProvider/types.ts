import type { ReactNode } from "react";

import type { Account, AuthUser } from "@/features/auth/models";

export interface AccountContextValue {
  account: Account;
  /** Stores the user returned by sign-in */
  logUser: (user: AuthUser) => void;
  /** Revokes the tokens and clears the local account */
  logoutUser: () => Promise<void>;
  /** Validates the stored session against sito-auth */
  restoreSession: () => Promise<void>;
}

export interface AccountProviderProps {
  children: ReactNode;
}
