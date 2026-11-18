import type { ReactNode } from "react";

export interface SettingsSectionProps {
  title: string;
  /** Text under the content (what the setting does) */
  helper?: string;
  children: ReactNode;
}
