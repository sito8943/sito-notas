import {
  faCalendar,
  faGear,
  faNoteSticky,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { AppRoute } from "@/shared/routes";

import type { AppBottomNavigationItemConfig } from "./types";

/** Split in two halves around the add-note button; tags are tabs on home */
export const BOTTOM_NAVIGATION_ITEMS: AppBottomNavigationItemConfig[] = [
  {
    id: "home",
    labelKey: "_pages:routes.home",
    icon: faNoteSticky,
    route: AppRoute.Home,
    end: true,
  },
  {
    id: "calendar",
    labelKey: "_pages:routes.calendar",
    icon: faCalendar,
    route: AppRoute.Calendar,
    disabled: true,
  },
  {
    id: "trash",
    labelKey: "_pages:routes.trash",
    icon: faTrash,
    route: AppRoute.Trash,
  },
  {
    id: "settings",
    labelKey: "_pages:routes.settings",
    icon: faGear,
    route: AppRoute.Settings,
  },
];
