import {
  faArrowRightFromBracket,
  faCalendar,
  faGear,
  faHouse,
  faNoteSticky,
  faTag,
  faTrash,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import { AppRoute } from "@/shared/routes";

import type { AppSidebarItemConfig } from "./types";

export const SIDEBAR_ITEMS: AppSidebarItemConfig[] = [
  {
    id: "home",
    labelKey: "_pages:routes.home",
    icon: faHouse,
    route: AppRoute.Home,
    end: true,
  },
  {
    id: "notes",
    labelKey: "_pages:routes.notes",
    icon: faNoteSticky,
    route: AppRoute.Notes,
    disabled: true,
  },
  {
    id: "tags",
    labelKey: "_pages:routes.tags",
    icon: faTag,
    route: AppRoute.Tags,
    disabled: true,
  },
  {
    id: "calendar",
    labelKey: "_pages:routes.calendar",
    icon: faCalendar,
    route: AppRoute.Calendar,
    disabled: true,
  },
  {
    id: "shared",
    labelKey: "_pages:routes.shared",
    icon: faUserGroup,
    route: AppRoute.Shared,
    disabled: true,
  },
];

export const SIDEBAR_FOOTER_ITEMS: AppSidebarItemConfig[] = [
  {
    id: "settings",
    labelKey: "_pages:routes.settings",
    icon: faGear,
    route: AppRoute.Settings,
  },
  {
    id: "trash",
    labelKey: "_pages:routes.trash",
    icon: faTrash,
    route: AppRoute.Trash,
    disabled: true,
  },
  {
    id: "signOut",
    labelKey: "_pages:routes.signOut",
    icon: faArrowRightFromBracket,
    route: AppRoute.SignOut,
  },
];
