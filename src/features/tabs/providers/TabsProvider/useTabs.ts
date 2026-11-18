import { useContext } from "react";

import { TabsContext } from "./TabsContext";
import type { TabsContextValue } from "./types";

function useTabs(): TabsContextValue {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
}

export default useTabs;
