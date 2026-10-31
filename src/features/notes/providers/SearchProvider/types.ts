import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { Note } from "@/features/notes/models";

export interface SearchContextValue {
  searchFunction: (note: Note) => boolean;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  /** Selected tag; null shows every note */
  categoryId: number | null;
  setCategoryId: Dispatch<SetStateAction<number | null>>;
  /** Show only favorite notes (combined with the tag, when one is set) */
  favoritesOnly: boolean;
  setFavoritesOnly: Dispatch<SetStateAction<boolean>>;
}

export interface SearchProviderProps {
  children: ReactNode;
}
