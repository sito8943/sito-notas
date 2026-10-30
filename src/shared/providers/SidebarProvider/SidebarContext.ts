import { createContext } from "react";

import type { SidebarContextValue } from "./types";

export const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined,
);
