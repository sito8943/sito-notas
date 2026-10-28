import { createContext } from "react";

import type { SearchContextValue } from "./types";

export const SearchContext = createContext<SearchContextValue | undefined>(
  undefined,
);
