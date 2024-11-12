import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const CacheContext = createContext({});

// utils
import { fromLocal, toLocal } from "../utils/local";
import { ReactQueryKeys } from "../utils/queryKeys";

// providers
import { useAccount } from "./AccountProvider";
import { useAppApiClient, queryClient } from "./AppApiProvider";

// config
import config from "../config";

/**
 * CacheProvider
 * @param {object} props - Props
 * @returns {object} React component
 */
const CacheProvider = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;

  const appApiClient = useAppApiClient();

  const { account } = useAccount();

  const { data, isLoading, isFetching, isPending, isRefetching } = useQuery({
    queryKey: [ReactQueryKeys.Notes, account.user?.id],
    queryFn: () => appApiClient.Note.get(account.user?.id),
    enabled: !!account.user?.id,
  });

  const [cachedData, setCache] = useState();

  useEffect(() => {
    let cached = null;
    try {
      cached = fromLocal(config.notes, "object");
    } catch (e) {
      console.error(e);
    }

    if ((data && !data?.error?.message) || cached) {
      toLocal(config.notes, data?.items ?? cached);
      setCache(data?.items ?? cached);
    } else return setCache(undefined);
  }, [data]);

  const refresh = useCallback(
    () =>
      queryClient.invalidateQueries([ReactQueryKeys.Notes, account.user?.id]),
    [account.user?.id]
  );

  return (
    <CacheContext.Provider
      value={{
        isLoading: isLoading,
        isSyncing: isFetching || isPending || isRefetching,
        refresh,
        cache: cachedData,
        localSet: setCache,
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};

/**
 * @returns {Cache} Cache
 */
const useCache = () => {
  const context = useContext(CacheContext);
  if (context === undefined) {
    throw new Error("useCache must be used within a CacheProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { CacheProvider, useCache };
