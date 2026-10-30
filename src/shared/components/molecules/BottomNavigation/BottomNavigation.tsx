// @sito/ui
import { ICON_BUTTON_SIZES, IconButton } from "@sito/ui";

import { BottomNavigationItem } from "./BottomNavigationItem";
import type { BottomNavigationProps } from "./types";
import { splitAroundAction } from "./utils";
import "./styles.css";

/** Mobile app navigation: icon items with a raised central action */
function BottomNavigation(props: BottomNavigationProps) {
  const { items, action, label } = props;

  const { start, end } = splitAroundAction(items);

  return (
    <nav aria-label={label} className="bottom-nav">
      <ul className="bottom-nav-list">
        {start.map((item) => (
          <li key={item.id}>
            <BottomNavigationItem item={item} />
          </li>
        ))}
        {action ? (
          <li className="bottom-nav-action-slot">
            <IconButton
              variant="submit"
              color="primary"
              size={ICON_BUTTON_SIZES.LG}
              aria-label={action.label}
              title={action.label}
              onClick={action.onClick}
              disabled={action.disabled}
              icon={action.icon}
              className="bottom-nav-action"
            />
          </li>
        ) : null}
        {end.map((item) => (
          <li key={item.id}>
            <BottomNavigationItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNavigation;
