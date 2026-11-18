import { useCallback, useMemo, useState } from "react";

// models
import type { Note } from "@/features/notes/models";

import { SearchContext } from "./SearchContext";
import type { SearchProviderProps } from "./types";
import { matchesSearch } from "./utils";

function SearchProvider({ children }: SearchProviderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const searchFunction = useCallback(
    (note: Note) => {
      if (favoritesOnly && !note.favorite) return false;
      if (
        categoryId !== null &&
        !note.categories.some((category) => category.id === categoryId)
      )
        return false;
      return matchesSearch(note, searchValue);
    },
    [searchValue, categoryId, favoritesOnly],
  );

  const value = useMemo(
    () => ({
      searchFunction,
      searchValue,
      setSearchValue,
      categoryId,
      setCategoryId,
      favoritesOnly,
      setFavoritesOnly,
    }),
    [searchFunction, searchValue, categoryId, favoritesOnly],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export default SearchProvider;
