import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

// utils
import { removeFromLocal, toLocal } from "@/shared/lib/storage";
import { queryClient } from "@/shared/lib/queryClient";
import {
  getNotesListKey,
  NOTES_STORAGE_KEY,
  ReactQueryKeys,
} from "@/features/notes/constants";

// providers
import { useAccount } from "@/features/auth";
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

// models
import type { Note } from "@/features/notes/models";

import { CacheContext } from "./CacheContext";
import type { CacheProviderProps } from "./types";
import { readCachedNotes } from "./utils";

/**
 * CacheProvider: the user's notes, persisted locally for offline use and
 * cleared when the session ends
 */
function CacheProvider({ children }: CacheProviderProps) {
  const appApiClient = useAppApiClient();

  const { account } = useAccount();
  const userId = account.user?.id;

  const { data, isLoading, isFetching, isPending, isRefetching } = useQuery({
    queryKey: getNotesListKey(userId),
    queryFn: () => appApiClient.Note.list(),
    enabled: userId !== undefined,
  });

  const [cachedData, setCache] = useState<Note[] | undefined>();

  useEffect(() => {
    if (userId === undefined) {
      removeFromLocal(NOTES_STORAGE_KEY);
      queryClient.removeQueries({ queryKey: [ReactQueryKeys.Notes] });
      setCache(undefined);
      return;
    }
    if (data) {
      toLocal(NOTES_STORAGE_KEY, data);
      setCache(data);
      return;
    }
    setCache(readCachedNotes());
  }, [data, userId]);

  const refresh = useCallback(
    () => queryClient.invalidateQueries({ queryKey: getNotesListKey(userId) }),
    [userId],
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
