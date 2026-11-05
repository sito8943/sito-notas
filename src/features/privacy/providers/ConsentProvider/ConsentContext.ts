import { createContext } from "react";

import type { ConsentContextValue } from "./types";

export const ConsentContext = createContext<ConsentContextValue | undefined>(
  undefined,
);
