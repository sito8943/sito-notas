import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

// utils
import { fromLocalObject, toLocal } from "@/shared/lib/storage";
import { queryClient } from "@/shared/lib/queryClient";
import { NOTES_STORAGE_KEY, ReactQueryKeys } from "@/features/notes/constants";

// providers
import { useAccount } from "@/features/auth";
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// models
import type { Note } from "@/features/notes/models";

import { CacheContext } from "./CacheContext";
import type { CacheProviderProps } from "./types";

/**
 * CacheProvider
 */
function CacheProvider({ children }: CacheProviderProps) {
  const appApiClient = useAppApiClient();

  const { account } = useAccount();

  const { data, isLoading, isFetching, isPending, isRefetching } = useQuery({
    queryKey: [ReactQueryKeys.Notes, account.user?.id],
    queryFn: () => appApiClient.Note.get(account.user?.id),
    enabled: !!account.user?.id,
  });

  const [cachedData, setCache] = useState<Note[] | undefined>();

  useEffect(() => {
    let cached: Note[] | undefined;
    try {
      cached = fromLocalObject<Note[]>(NOTES_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }

    const next = data?.items ?? cached;
    if ((data && !data.error?.message) || cached) {
      toLocal(NOTES_STORAGE_KEY, next);
      setCache(next);
    } else setCache(undefined);
  }, [data]);

  const refresh = useCallback(
    () =>
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.Notes, account.user?.id],
      }),
    [account.user?.id],
  );

  const value = useMemo(
    () => ({
      isLoading,
      isSyncing: isFetching || isPending || isRefetching,
      refresh,
      cache: cachedData,
      localSet: setCache,
    }),
    [isLoading, isFetching, isPending, isRefetching, refresh, cachedData],
  );

  return (
    <CacheContext.Provider value={value}>{children}</CacheContext.Provider>
  );
}

export default CacheProvider;
