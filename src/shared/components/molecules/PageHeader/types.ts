import type { ReactNode } from "react";

export interface PageHeaderCrumb {
  label: string;
  /** Route of the crumb; the last crumb (current page) has none */
  to?: string;
}

export interface PageHeaderProps {
  /** Path to this page, current page last */
  crumbs: PageHeaderCrumb[];
  onBack: () => void;
  backLabel: string;
  /** Accessible name of the breadcrumb <nav> */
  navLabel: string;
  /** Right side (page actions) */
  actions?: ReactNode;
}
