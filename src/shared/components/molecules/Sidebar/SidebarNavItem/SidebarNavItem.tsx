import { NavLink } from "react-router-dom";

import {
  NAV_ITEM_ACTIVE_CLASSNAME,
  NAV_ITEM_BASE_CLASSNAME,
  NAV_ITEM_DISABLED_CLASSNAME,
  NAV_ITEM_IDLE_CLASSNAME,
} from "./constants";
import type { SidebarNavItemProps } from "./types";

/** One sidebar entry: route link, action button or disabled placeholder */
function SidebarNavItem(props: SidebarNavItemProps) {
  const { item, collapsed, onNavigate } = props;
  const { label, icon, to, end, onClick, badge, disabled } = item;

  const content = (
    <>
      <span className="flex w-5 shrink-0 justify-center" aria-hidden>
        {icon}
      </span>
      {collapsed ? null : (
        <span className="reveal-after-grow flex-1 truncate">{label}</span>
      )}
      {badge ? (
        <span
          className={`flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-on-brand ${
            collapsed ? "absolute top-1 right-1 h-4 min-w-4 px-1" : ""
          }`}
        >
          {badge}
        </span>
      ) : null}
    </>
  );

  // Collapsed: the label is only reachable through aria-label and title
  const a11y = collapsed ? { "aria-label": label, title: label } : {};
  const layout = collapsed ? "justify-center px-0" : "";

  if (disabled)
    return (
      <span
        {...a11y}
        aria-disabled
        className={`${NAV_ITEM_BASE_CLASSNAME} ${NAV_ITEM_DISABLED_CLASSNAME} ${layout}`}
      >
        {content}
      </span>
    );

  if (to)
    return (
      <NavLink
        to={to}
        end={end}
        onClick={() => {
          onClick?.();
          onNavigate?.();
        }}
        {...a11y}
        className={({ isActive }) =>
          `${NAV_ITEM_BASE_CLASSNAME} ${
            isActive ? NAV_ITEM_ACTIVE_CLASSNAME : NAV_ITEM_IDLE_CLASSNAME
          } ${layout}`
        }
      >
        {content}
      </NavLink>
    );

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        onNavigate?.();
      }}
      {...a11y}
      className={`${NAV_ITEM_BASE_CLASSNAME} ${NAV_ITEM_IDLE_CLASSNAME} ${layout}`}
    >
      {content}
    </button>
  );
}

export default SidebarNavItem;
