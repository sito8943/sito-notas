import type { Tab } from "@/features/tabs/models";

export interface TabBarItemProps {
  tab: Tab;
  /** 1-based position, for its Alt+number shortcut */
  position: number;
  active: boolean;
  /** Shows the close button (not on the only tab) */
  closable: boolean;
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
}
