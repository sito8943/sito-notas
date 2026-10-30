import type { TFunction } from "i18next";
import { createElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { BottomNavigationItemData } from "@/shared/components/molecules/BottomNavigation";

import type { AppBottomNavigationItemConfig } from "./types";

/**
 * @param items - bottom bar config
 * @param t - translator
 * @returns items ready for the BottomNavigation molecule
 */
export const toBottomNavigationItems = (
  items: AppBottomNavigationItemConfig[],
  t: TFunction,
): BottomNavigationItemData[] =>
  items.map(({ id, labelKey, icon, route, end, disabled }) => ({
    id,
    label: t(labelKey),
    icon: createElement(FontAwesomeIcon, { icon }),
    to: route,
    end,
    disabled,
  }));
