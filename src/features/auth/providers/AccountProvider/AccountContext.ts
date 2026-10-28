import { createContext } from "react";

import type { AccountContextValue } from "./types";

export const AccountContext = createContext<AccountContextValue | undefined>(
  undefined,
);
