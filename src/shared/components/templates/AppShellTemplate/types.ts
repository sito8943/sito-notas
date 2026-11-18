import type { ReactNode } from "react";

export interface AppShellTemplateProps {
  /** Left side of the header (back button, user, logo) */
  brand: ReactNode;
  /** Right side of the header, rendered inside a <nav> */
  actions?: ReactNode;
  /** Pages with their own top bar (e.g. the note editor) hide the header */
  hideHeader?: boolean;
  /** Accessible name of the header navigation */
  navLabel?: string;
  /** Bar over the header and content (e.g. open tabs) */
  tabBar?: ReactNode;
  /** Side navigation, left of the header and content */
  sidebar?: ReactNode;
  /** Navigation fixed to the bottom on small screens */
  bottomNavigation?: ReactNode;
  /** Page content; pages render their own <main> */
  children: ReactNode;
}
