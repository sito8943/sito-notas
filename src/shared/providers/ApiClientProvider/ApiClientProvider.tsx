import { createContext, useContext } from "react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

// lib
import { queryClient } from "@/shared/lib/queryClient";

// types
import type { ApiClient, ApiClientProviderProps } from "./types";

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const ApiClientContext = createContext<ApiClient | undefined>(undefined);

/**
 * ApiClientProvider
 * Exposes the API client injected by the app composition root
 */
const ApiClientProvider = (props: ApiClientProviderProps) => {
  const { client, children } = props;

  return (
    <ApiClientContext.Provider value={client}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        {children}
      </PersistQueryClientProvider>
    </ApiClientContext.Provider>
  );
};

const useAppApiClient = (): ApiClient => {
  const context = useContext(ApiClientContext);
  if (context === undefined) {
    throw new Error("useAppApiClient must be used within a ApiClientProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ApiClientProvider, useAppApiClient };
