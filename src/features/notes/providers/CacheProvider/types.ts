import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { Note } from "../../models";

export interface CacheContextValue {
  isLoading: boolean;
  isSyncing: boolean;
  refresh: () => Promise<void>;
  cache: Note[] | undefined;
  localSet: Dispatch<SetStateAction<Note[] | undefined>>;
}

export interface CacheProviderProps {
  children: ReactNode;
}
