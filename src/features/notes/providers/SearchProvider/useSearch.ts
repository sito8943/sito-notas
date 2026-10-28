import { useContext } from "react";

import { SearchContext } from "./SearchContext";
import type { SearchContextValue } from "./types";

function useSearch(): SearchContextValue {
  const context = useContext(SearchContext);
  if (context === undefined)
    throw new Error("searchContext must be used within a Provider");
  return context;
}

export default useSearch;
