import { useTranslation } from "react-i18next";

// @sito/ui
import { ICON_BUTTON_SIZES, IconButton, Tooltip } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// lib
import { formatHotkey, isApplePlatform } from "@/shared/lib/hotkeys";

// features
import { TabBarItem } from "@/features/tabs/components/TabBarItem";
import { useTabs } from "@/features/tabs/providers/TabsProvider";
import {
  TabAriaShortcut,
  useTabShortcuts,
} from "@/features/tabs/hooks/useTabShortcuts";

import { NEW_TAB_HOTKEY } from "./constants";
import "./styles.css";

/** Open tabs over the page, a + for a new note tab, and the tab shortcuts */
function TabBar() {
  const { t } = useTranslation();
  const { tabs, activeId, activateTab, closeTab } = useTabs();
  const { newTab, isAdding } = useTabShortcuts();

  const newLabel = t("_pages:tabs.new");

  return (
    <div className="tab-bar">
      <div
        role="tablist"
        aria-label={t("_pages:tabs.label")}
        className="tab-bar-list"
      >
        {tabs.map((tab, index) => (
          <TabBarItem
            key={tab.id}
            tab={tab}
            position={index + 1}
            active={tab.id === activeId}
            closable={tabs.length > 1}
            onActivate={activateTab}
            onClose={closeTab}
          />
        ))}
      </div>
      <Tooltip
        label={newLabel}
        hotkey={formatHotkey(NEW_TAB_HOTKEY, isApplePlatform())}
      >
        <IconButton
          size={ICON_BUTTON_SIZES.SM}
          aria-label={newLabel}
          aria-keyshortcuts={TabAriaShortcut.New}
          onClick={newTab}
          disabled={isAdding}
          icon={<FontAwesomeIcon icon={faPlus} />}
          className="tab-bar-new"
        />
      </Tooltip>
    </div>
  );
}

export default TabBar;
