import type { ReactNode } from "react";

export interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
}

export interface SidebarProviderProps {
  children: ReactNode;
}
