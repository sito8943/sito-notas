// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { Button, ICON_BUTTON_SIZES, IconButton } from "@sito/ui";

import { SidebarNavItem } from "./SidebarNavItem";
import type { SidebarProps } from "./types";
import "./styles.css";

/**
 * Collapsible app navigation for wide screens. Collapsed it is an icon rail.
 */
function Sidebar(props: SidebarProps) {
  const {
    brand,
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
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-header">
        <div
          className="sidebar-brand primary"
          title={collapsed ? brand.name : undefined}
        >
          <span className="sidebar-brand-mark">{brand.mark}</span>
          {collapsed ? null : (
            <span className="sidebar-brand-name reveal-after-grow">
              {brand.name}
            </span>
          )}
        </div>
        <IconButton
          color="primary"
          size={ICON_BUTTON_SIZES.SM}
          aria-label={toggleLabel}
          aria-expanded={open}
          onClick={onToggle}
          icon={<FontAwesomeIcon icon={open ? faAnglesLeft : faAnglesRight} />}
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
            className="sidebar-action reveal-after-grow"
          >
            {action.icon}
            {action.label}
          </Button>
        )
      ) : null}

      <nav aria-label={labels.navigation} className="sidebar-nav">
        <ul className="sidebar-list">
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
          <ul className="sidebar-list footer">
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
  );
}

export default Sidebar;
