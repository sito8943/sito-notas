import { useContext } from "react";

import { CacheContext } from "./CacheContext";
import type { CacheContextValue } from "./types";

function useCache(): CacheContextValue {
  const context = useContext(CacheContext);
  if (context === undefined) {
    throw new Error("useCache must be used within a CacheProvider");
  }
  return context;
}

export default useCache;
