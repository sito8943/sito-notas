import { NavLink } from "react-router-dom";

import type { SidebarNavItemProps } from "./types";
import "./styles.css";

/** One sidebar entry: route link, action button or disabled placeholder */
function SidebarNavItem(props: SidebarNavItemProps) {
  const { item, collapsed, onNavigate } = props;
  const { label, icon, to, end, onClick, badge, disabled } = item;

  const content = (
    <>
      <span className="sidebar-item-icon" aria-hidden>
        {icon}
      </span>
      {collapsed ? null : (
        <span className="sidebar-item-label reveal-after-grow">{label}</span>
      )}
      {badge ? <span className="sidebar-item-badge">{badge}</span> : null}
    </>
  );

  // Collapsed: the label is only reachable through aria-label and title
  const a11y = collapsed ? { "aria-label": label, title: label } : {};
  const className = `sidebar-item ${collapsed ? "collapsed" : ""}`;

  const handleClick = () => {
    onClick?.();
    onNavigate?.();
  };

  if (disabled)
    return (
      <span {...a11y} aria-disabled className={`${className} disabled`}>
        {content}
      </span>
    );

  if (to)
    return (
      <NavLink
        to={to}
        end={end}
        onClick={handleClick}
        {...a11y}
        className={({ isActive }) => `${className} ${isActive ? "active" : ""}`}
      >
        {content}
      </NavLink>
    );

  return (
    <button type="button" onClick={handleClick} {...a11y} className={className}>
      {content}
    </button>
  );
}

export default SidebarNavItem;
