import type { ReactNode } from "react";

export interface SidebarNavItemData {
  id: string;
  label: string;
  icon: ReactNode;
  /** Route to navigate to; items without it render as buttons */
  to?: string;
  /** Match the route exactly (e.g. the root route) */
  end?: boolean;
  onClick?: () => void;
  /** Counter shown next to the label (hidden when 0 or missing) */
  badge?: number;
  disabled?: boolean;
}

export interface SidebarBrand {
  name: string;
  /** App mark (logo); the name hides on the collapsed rail */
  mark: ReactNode;
}

export interface SidebarAction {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

export interface SidebarProps {
  brand: SidebarBrand;
  /** Primary call to action at the top (e.g. add category) */
  action?: SidebarAction;
  /** Main navigation */
  items: SidebarNavItemData[];
  /** Navigation pinned to the bottom, (settings, sign out) */
  footerItems?: SidebarNavItemData[];
  open: boolean;
  onToggle: () => void;
  /** Called after an item is chosen (e.g. close the overlay on mobile) */
  onNavigate?: () => void;
  labels: {
    /** Accessible name of the <nav> */
    navigation: string;
    expand: string;
    collapse: string;
  };
}
