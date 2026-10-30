import { useCallback, useEffect, useMemo, useState } from "react";

import { SidebarContext } from "./SidebarContext";
import type { SidebarProviderProps } from "./types";
import { readStoredOpen, storeOpen } from "./utils";

/** Expanded/collapsed state of the app sidebar, persisted per device */
function SidebarProvider({ children }: SidebarProviderProps) {
  const [open, setOpen] = useState<boolean>(readStoredOpen);

  useEffect(() => {
    storeOpen(open);
  }, [open]);

  const toggleOpen = useCallback(() => setOpen((current) => !current), []);

  const value = useMemo(
    () => ({ open, setOpen, toggleOpen }),
    [open, toggleOpen],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export default SidebarProvider;
