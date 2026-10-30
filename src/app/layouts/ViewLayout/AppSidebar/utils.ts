import type { TFunction } from "i18next";
import { createElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { SidebarNavItemData } from "@/shared/components/molecules/Sidebar";

import type { AppSidebarItemConfig } from "./types";

/**
 * @param items - sidebar config
 * @param t - translator
 * @returns items ready for the Sidebar molecule
 */
export const toNavItems = (
  items: AppSidebarItemConfig[],
  t: TFunction,
): SidebarNavItemData[] =>
  items.map(({ id, labelKey, icon, route, end, disabled }) => ({
    id,
    label: t(labelKey),
    icon: createElement(FontAwesomeIcon, { icon }),
    to: route,
    end,
    disabled,
  }));
