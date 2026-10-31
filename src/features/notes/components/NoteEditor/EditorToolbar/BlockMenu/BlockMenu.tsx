import { Fragment, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  Tooltip,
  useContextMenu,
} from "@sito/ui";

import {
  BLOCK_TYPES,
  MENU_OFFSET_PX,
  TOOLBAR_TOOLTIP_SIDE,
} from "@/features/notes/components/NoteEditor/EditorToolbar/constants";
import { formatHotkey } from "@/features/notes/components/NoteEditor/EditorToolbar/utils";
import type { BlockMenuProps } from "./types";
import "./styles.css";

/** Dropdown to turn the current block into text, a heading, a quote… */
function BlockMenu({ editor, blockId, isMac }: BlockMenuProps) {
  const { t } = useTranslation();
  const menu = useContextMenu<null>();

  const current =
    BLOCK_TYPES.find((block) => block.id === blockId) ?? BLOCK_TYPES[0];
  const label = t("_pages:note.toolbar.block");

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    menu.openAt(rect.left, rect.bottom + MENU_OFFSET_PX, null);
  };

  return (
    <>
      <Tooltip label={label} side={TOOLBAR_TOOLTIP_SIDE}>
        <button
          type="button"
          aria-label={`${label}: ${t(current.labelKey)}`}
          aria-haspopup="menu"
          aria-expanded={menu.open}
          onClick={openMenu}
          className="block-menu-button"
        >
          <span>{t(current.shortLabelKey)}</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="block-menu-chevron"
          />
        </button>
      </Tooltip>
      <ContextMenu
        open={menu.open}
        position={menu.position}
        onClose={menu.close}
        ariaLabel={label}
      >
        {BLOCK_TYPES.map((block) => (
          <Fragment key={block.id}>
            {block.isActive ? null : <ContextMenuSeparator />}
            <ContextMenuItem
              leading={
                <FontAwesomeIcon
                  icon={faCheck}
                  className={`block-menu-check ${
                    block.id === current.id ? "visible" : ""
                  }`}
                />
              }
              shortcut={
                block.hotkey ? formatHotkey(block.hotkey, isMac) : undefined
              }
              onClick={() => {
                block.run(editor);
                menu.close();
              }}
            >
              {t(block.labelKey)}
            </ContextMenuItem>
          </Fragment>
        ))}
      </ContextMenu>
    </>
  );
}

export default BlockMenu;
