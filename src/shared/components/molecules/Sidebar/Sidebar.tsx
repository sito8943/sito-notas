// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { Button, ICON_BUTTON_SIZES, IconButton } from "@sito/ui";

import { SIDEBAR_WIDTH_CLASSNAME } from "./constants";
import { SidebarNavItem } from "./SidebarNavItem";
import type { SidebarProps } from "./types";

/**
 * Collapsible app navigation. Collapsed it is an icon rail; expanded on small
 * screens it overlays the content with a backdrop.
 */
function Sidebar(props: SidebarProps) {
  const {
    user,
    action,
    items,
    footerItems = [],
    open,
    onToggle,
    onNavigate,
    labels,
  } = props;

  const collapsed = !open;
  const toggleLabel = open ? labels.collapse : labels.expand;

  return (
    <>
      {open ? (
        <>
          {/* Keeps the rail's space while the expanded sidebar overlays */}
          <div
            className={`hidden md:block shrink-0 ${SIDEBAR_WIDTH_CLASSNAME.collapsed}`}
          />
          <button
            type="button"
            aria-label={labels.collapse}
            onClick={onToggle}
            className="hidden md:block fixed inset-0 z-30 bg-black/40"
          />
        </>
      ) : null}
      <aside
        className={`flex h-full shrink-0 flex-col gap-5 overflow-y-auto overflow-x-hidden whitespace-nowrap border-r border-border bg-base-light py-5 transition-[width] duration-200 ${
          open
            ? `${SIDEBAR_WIDTH_CLASSNAME.open} px-4 md:fixed md:inset-y-0 md:left-0 md:z-40 md:shadow-xl`
            : `${SIDEBAR_WIDTH_CLASSNAME.collapsed} items-center px-2`
        }`}
      >
        <div
          className={`flex items-center gap-3 ${collapsed ? "flex-col" : ""}`}
        >
          <img
            src={user.avatarSrc}
            alt=""
            title={collapsed ? user.name : undefined}
            className="h-10 w-10 max-w-none shrink-0 rounded-full object-cover"
          />
          {collapsed ? null : (
            <span className="reveal-after-grow flex-1 truncate font-bold capitalize">
              {user.name}
            </span>
          )}
          <IconButton
            color="primary"
            size={ICON_BUTTON_SIZES.SM}
            aria-label={toggleLabel}
            aria-expanded={open}
            onClick={onToggle}
            icon={
              <FontAwesomeIcon icon={open ? faAnglesLeft : faAnglesRight} />
            }
          />
        </div>

        {action ? (
          collapsed ? (
            <IconButton
              variant="submit"
              color="primary"
              aria-label={action.label}
              title={action.label}
              onClick={action.onClick}
              icon={action.icon}
            />
          ) : (
            <Button
              variant="submit"
              color="primary"
              onClick={action.onClick}
              className="reveal-after-grow w-full justify-center gap-2"
            >
              {action.icon}
              {action.label}
            </Button>
          )
        ) : null}

        <nav
          aria-label={labels.navigation}
          className="flex flex-1 flex-col w-full"
        >
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.id}>
                <SidebarNavItem
                  item={item}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>
          {footerItems.length ? (
            <ul className="mt-auto flex flex-col gap-1 border-t border-border pt-4">
              {footerItems.map((item) => (
                <li key={item.id}>
                  <SidebarNavItem
                    item={item}
                    collapsed={collapsed}
                    onNavigate={onNavigate}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
