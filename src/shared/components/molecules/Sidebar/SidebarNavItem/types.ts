import type { SidebarNavItemData } from "@/shared/components/molecules/Sidebar/types";

export interface SidebarNavItemProps {
  item: SidebarNavItemData;
  /** Collapsed sidebar: icon only, label as tooltip */
  collapsed: boolean;
  onNavigate?: () => void;
}
