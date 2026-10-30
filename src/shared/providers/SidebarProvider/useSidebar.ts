import { useContext } from "react";

import { SidebarContext } from "./SidebarContext";
import type { SidebarContextValue } from "./types";

function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
}

export default useSidebar;
