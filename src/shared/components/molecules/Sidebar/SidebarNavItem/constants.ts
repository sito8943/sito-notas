export const NAV_ITEM_BASE_CLASSNAME =
  "relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors";

export const NAV_ITEM_IDLE_CLASSNAME =
  "text-text-muted hover:bg-base-dark hover:text-text";

/** Active route: accent bar on the left edge + raised surface */
export const NAV_ITEM_ACTIVE_CLASSNAME =
  "bg-base-dark text-text-primary before:absolute before:-left-2 before:inset-y-1 before:w-1 before:rounded-r before:bg-text-primary";

export const NAV_ITEM_DISABLED_CLASSNAME =
  "cursor-not-allowed text-text-muted opacity-50";
