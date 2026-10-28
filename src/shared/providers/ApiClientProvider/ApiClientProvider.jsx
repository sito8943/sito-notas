import { createContext, useContext } from "react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

// lib
import { queryClient } from "../../lib/queryClient";

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const ApiClientContext = createContext(undefined);

/**
 * ApiClientProvider
 * Exposes the API client injected by the app composition root
 * @param {object} props - Props
 * @returns {object} React component
 */
const ApiClientProvider = (props) => {
  // eslint-disable-next-line react/prop-types
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

/**
 * @returns {object} API client injected by the app
 */
const useAppApiClient = () => {
  const context = useContext(ApiClientContext);
  if (context === undefined) {
    throw new Error("useAppApiClient must be used within a ApiClientProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ApiClientProvider, useAppApiClient };
