import stringSimilarity from "string-similarity";
import { useCallback, useMemo, useState } from "react";

// models
import type { Note } from "@/features/notes/models";

import { SEARCH_SIMILARITY_THRESHOLD } from "./constants";
import { SearchContext } from "./SearchContext";
import type { SearchProviderProps } from "./types";

function SearchProvider({ children }: SearchProviderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const searchFunction = useCallback(
    (note: Note) => {
      if (
        categoryId !== null &&
        !note.categories.some((category) => category.id === categoryId)
      )
        return false;
      const toSearch = searchValue.toLowerCase();
      if (!toSearch.length) return true;
      const title = note?.title?.toLowerCase() ?? "";
      return (
        stringSimilarity.compareTwoStrings(title, toSearch) >
          SEARCH_SIMILARITY_THRESHOLD || title.includes(toSearch)
      );
    },
    [searchValue, categoryId],
  );

  const value = useMemo(
    () => ({
      searchFunction,
      searchValue,
      setSearchValue,
      categoryId,
      setCategoryId,
    }),
    [searchFunction, searchValue, categoryId],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export default SearchProvider;
