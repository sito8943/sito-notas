import { useCallback, useMemo, useState } from "react";

// providers
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// utils
import {
  fromLocalObject,
  removeFromLocal,
  toLocal,
} from "@/shared/lib/storage";

// config
import config from "@/shared/config";

// models
import type { Account } from "@/features/auth/models";

import { AccountContext } from "./AccountContext";
import type { AccountProviderProps } from "./types";

/**
 * Account Provider
 */
function AccountProvider({ children }: AccountProviderProps) {
  const appApiClient = useAppApiClient();

  const [account, setAccount] = useState<Account>({});

  const logUser = useCallback((data: Account) => {
    setAccount(data);
    toLocal(config.user, data);
  }, []);

  const logoutUser = useCallback(() => {
    setAccount({});
    removeFromLocal(config.user);
    appApiClient.User.logout();
  }, [appApiClient.User]);

  const logUserFromLocal = useCallback(async () => {
    try {
      const response = await appApiClient.User.getSession();
      if (response.error) {
        const loggedUser = fromLocalObject<Account>(config.user);
        setAccount(loggedUser ?? {});
      }
      if (response.data?.user !== null) {
        const loggedUser = fromLocalObject<Account>(config.user);

        if (loggedUser?.user) {
          const request = await appApiClient.User.fetchUserSettings(
            loggedUser.user.id,
          );
          const appUser = await request.json();

          if (appUser) setAccount({ ...loggedUser, appUser });
          else setAccount(loggedUser);
        } else throw new Error("401");
      } else logoutUser();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      logoutUser();
    }
  }, [logoutUser, appApiClient.User]);

  const value = useMemo(
    () => ({ account, logUser, logoutUser, logUserFromLocal }),
    [account, logUser, logoutUser, logUserFromLocal],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export default AccountProvider;
