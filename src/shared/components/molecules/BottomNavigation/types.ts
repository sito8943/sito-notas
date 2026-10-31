import type { ReactNode } from "react";

export interface BottomNavigationItemData {
  id: string;
  /** Accessible name; the bar shows icons only */
  label: string;
  icon: ReactNode;
  to: string;
  /** Match the route exactly (e.g. the root route) */
  end?: boolean;
  /** Section without page yet: shown but not navigable */
  disabled?: boolean;
  /** Counter on the icon (hidden when 0 or missing) */
  badge?: number;
}

export interface BottomNavigationAction {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export interface BottomNavigationProps {
  /** Split in two halves around the action */
  items: BottomNavigationItemData[];
  /** Raised central button (e.g. add note) */
  action?: BottomNavigationAction;
  /** Accessible name of the <nav> */
  label: string;
}
