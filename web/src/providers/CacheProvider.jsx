import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

const CacheContext = createContext({});

// utils
import { ReactQueryKeys } from "../utils/queryKeys";

// providers
import { useAppApiClient } from "./AppApiProvider";

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

  const { isLoading, data } = useQuery({
    queryKey: [ReactQueryKeys.Notes, "all"],
    queryFn: () => appApiClient.Note.getAll(),
  });

  const cachedData = useMemo(() => {
    let cached = null;
    try {
      cached = JSON.parse(localStorage.getItem(config.cache));
    } catch (e) {
      console.error(e);
    }

    if ((data && !data?.error?.message) || cached) {
      localStorage.setItem(config.cache, JSON.stringify(data?.items ?? cached));
      return data?.items ?? cached;
    } else return undefined;
  }, [data]);

  return (
    <CacheContext.Provider
      value={{
        isLoading,
        cache: cachedData,
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
