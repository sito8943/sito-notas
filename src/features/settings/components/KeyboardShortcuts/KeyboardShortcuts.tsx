import { useTranslation } from "react-i18next";

// lib
import { formatHotkey, isApplePlatform } from "@/shared/lib/hotkeys";

// features
import { SettingsSection } from "@/features/settings/components/SettingsSection";

import { SHORTCUT_GROUPS } from "./constants";
import "./styles.css";

/** Keyboard shortcuts section: every shortcut of the app, read only */
function KeyboardShortcuts() {
  const { t } = useTranslation();
  const isMac = isApplePlatform();

  return (
    <SettingsSection
      title={t("_pages:settings.sections.shortcuts.title")}
      helper={t("_pages:settings.sections.shortcuts.helper")}
    >
      <div className="keyboard-shortcuts-groups">
        {SHORTCUT_GROUPS.map((group) => (
          <div key={group.titleKey} className="keyboard-shortcuts-group">
            <h4 className="keyboard-shortcuts-group-title">
              {t(group.titleKey)}
            </h4>
            <dl className="keyboard-shortcuts-list">
              {group.shortcuts.map((shortcut) => (
                <div key={shortcut.hotkey} className="keyboard-shortcuts-row">
                  <dt className="keyboard-shortcuts-label">
                    {t(shortcut.labelKey)}
                  </dt>
                  <dd>
                    <kbd className="keyboard-shortcuts-keys">
                      {formatHotkey(shortcut.hotkey, isMac)}
                    </kbd>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </SettingsSection>
  );
}

export default KeyboardShortcuts;
