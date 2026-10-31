import type { TFunction } from "i18next";
import { createElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { SidebarNavItemData } from "@/shared/components/molecules/Sidebar";

import type { AppSidebarItemConfig } from "./types";

/**
 * @param items - sidebar config
 * @param t - translator
 * @param unseenShared - new shared notes, for the item that shows them
 * @returns items ready for the Sidebar molecule
 */
export const toNavItems = (
  items: AppSidebarItemConfig[],
  t: TFunction,
  unseenShared = 0,
): SidebarNavItemData[] =>
  items.map(
    ({ id, labelKey, icon, route, end, disabled, unseenSharedBadge }) => ({
      id,
      label: t(labelKey),
      icon: createElement(FontAwesomeIcon, { icon }),
      to: route,
      end,
      disabled,
      ...(unseenSharedBadge ? { badge: unseenShared } : {}),
    }),
  );
