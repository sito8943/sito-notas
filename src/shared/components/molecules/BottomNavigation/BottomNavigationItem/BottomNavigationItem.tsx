import { NavLink } from "react-router-dom";

import type { BottomNavigationItemProps } from "./types";
import "./styles.css";

/** Icon-only entry of the bottom bar; the label is its accessible name */
function BottomNavigationItem({ item }: BottomNavigationItemProps) {
  const { label, icon, to, end, disabled, badge } = item;

  if (disabled)
    return (
      <span
        aria-label={label}
        title={label}
        aria-disabled
        className="bottom-nav-item disabled"
      >
        {icon}
      </span>
    );

  return (
    <NavLink
      to={to}
      end={end}
      aria-label={badge ? `${label} (${badge})` : label}
      title={label}
      className={({ isActive }) =>
        `bottom-nav-item ${isActive ? "active" : ""}`
      }
    >
      {icon}
      {badge ? (
        <span aria-hidden="true" className="bottom-nav-item-badge">
          {badge}
        </span>
      ) : null}
    </NavLink>
  );
}

export default BottomNavigationItem;
