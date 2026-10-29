import { useCallback, useEffect, useMemo, useState } from "react";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// utils
import { isHttpError } from "@/shared/lib/http";
import { removeFromLocal, toLocal } from "@/shared/lib/storage";

// constants
import { USER_STORAGE_KEY } from "@/features/auth/constants";

// models
import type { Account, AuthUser } from "@/features/auth/models";

import { AccountContext } from "./AccountContext";
import { INVALID_SESSION_STATUSES } from "./constants";
import type { AccountProviderProps } from "./types";
import { readStoredAccount } from "./utils";

/**
 * Account Provider: signed-in user state, kept in sync with the session
 */
function AccountProvider({ children }: AccountProviderProps) {
  const appApiClient = useAppApiClient();

  const [account, setAccount] = useState<Account>(() =>
    appApiClient.User.hasSession() ? readStoredAccount() : {},
  );

  const clearAccount = useCallback(() => {
    setAccount({});
    removeFromLocal(USER_STORAGE_KEY);
  }, []);

  // The session can end anywhere (failed refresh, other tab, sign-out)
  useEffect(
    () =>
      appApiClient.User.onSessionChange((tokens) => {
        if (!tokens) clearAccount();
      }),
    [appApiClient.User, clearAccount],
  );

  const logUser = useCallback((user: AuthUser) => {
    setAccount({ user });
    toLocal(USER_STORAGE_KEY, { user });
  }, []);

  const logoutUser = useCallback(async () => {
    clearAccount();
    await appApiClient.User.signOut();
  }, [appApiClient.User, clearAccount]);

  const restoreSession = useCallback(async () => {
    if (!appApiClient.User.hasSession()) {
      clearAccount();
      return;
    }
    try {
      logUser(await appApiClient.User.getSession());
    } catch (err) {
      if (isHttpError(err, ...INVALID_SESSION_STATUSES)) await logoutUser();
      // Offline or server down: keep the stored account
      else console.warn(err);
    }
  }, [appApiClient.User, clearAccount, logUser, logoutUser]);

  const value = useMemo(
    () => ({ account, logUser, logoutUser, restoreSession }),
    [account, logUser, logoutUser, restoreSession],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export default AccountProvider;
