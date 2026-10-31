import type { TFunction } from "i18next";
import { createElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { BottomNavigationItemData } from "@/shared/components/molecules/BottomNavigation";

import type { AppBottomNavigationItemConfig } from "./types";

/**
 * @param items - bottom bar config
 * @param t - translator
 * @param unseenShared - new shared notes, for the item that shows them
 * @returns items ready for the BottomNavigation molecule
 */
export const toBottomNavigationItems = (
  items: AppBottomNavigationItemConfig[],
  t: TFunction,
  unseenShared = 0,
): BottomNavigationItemData[] =>
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
