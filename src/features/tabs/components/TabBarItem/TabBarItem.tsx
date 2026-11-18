import { useEffect, useRef, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// hooks
import { useTabLabel } from "@/features/tabs/hooks/useTabLabel";
import {
  TabAriaShortcut,
  getTabPositionShortcut,
} from "@/features/tabs/hooks/useTabShortcuts";

import { MIDDLE_MOUSE_BUTTON } from "./constants";
import type { TabBarItemProps } from "./types";
import "./styles.css";

/** One tab: shows its page on click, closes with × or the middle button */
function TabBarItem(props: TabBarItemProps) {
  const { tab, position, active, closable, onActivate, onClose } = props;

  const { t } = useTranslation();
  const label = useTabLabel(tab.path);
  const ref = useRef<HTMLDivElement>(null);

  // The tab on screen is always visible in the bar
  useEffect(() => {
    if (active)
      ref.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  const onAuxClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!closable || event.button !== MIDDLE_MOUSE_BUTTON) return;
    event.preventDefault();
    onClose(tab.id);
  };

  return (
    <div
      ref={ref}
      role="presentation"
      onAuxClick={onAuxClick}
      className={`tab-bar-item ${active ? "active" : ""}`}
    >
      <button
        type="button"
        role="tab"
        aria-selected={active}
        aria-keyshortcuts={getTabPositionShortcut(position)}
        title={label}
        onClick={() => onActivate(tab.id)}
        className="tab-bar-item-label"
      >
        {label}
      </button>
      {closable ? (
        <button
          type="button"
          aria-label={t("_pages:tabs.close", { title: label })}
          aria-keyshortcuts={active ? TabAriaShortcut.Close : undefined}
          onClick={() => onClose(tab.id)}
          className="tab-bar-item-close"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      ) : null}
    </div>
  );
}

export default TabBarItem;
