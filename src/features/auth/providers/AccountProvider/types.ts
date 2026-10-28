import type { ReactNode } from "react";

import type { Account } from "@/features/auth/models";

export interface AccountContextValue {
  account: Account;
  logUser: (data: Account) => void;
  logoutUser: () => void;
  logUserFromLocal: () => Promise<void>;
}

export interface AccountProviderProps {
  children: ReactNode;
}
