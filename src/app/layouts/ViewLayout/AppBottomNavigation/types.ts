import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import type { AppRoute } from "@/shared/routes";

/** Bottom bar entry config; labels are i18n keys resolved at render */
export interface AppBottomNavigationItemConfig {
  id: string;
  labelKey: string;
  icon: IconDefinition;
  route: AppRoute;
  end?: boolean;
  /** Section without page yet: shown but not navigable */
  disabled?: boolean;
  /** Shows the "new shared notes" count */
  unseenSharedBadge?: boolean;
}
