import { createContext } from "react";

import type { CacheContextValue } from "./types";

export const CacheContext = createContext<CacheContextValue | undefined>(
  undefined,
);
