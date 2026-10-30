import type { ReactNode } from "react";

export interface AppShellTemplateProps {
  /** Left side of the header (back button, user, logo) */
  brand: ReactNode;
  /** Right side of the header, rendered inside a <nav> */
  actions?: ReactNode;
  /** Accessible name of the header navigation */
  navLabel?: string;
  /** Side navigation, left of the header and content */
  sidebar?: ReactNode;
  /** Navigation fixed to the bottom on small screens */
  bottomNavigation?: ReactNode;
  /** Page content; pages render their own <main> */
  children: ReactNode;
}
