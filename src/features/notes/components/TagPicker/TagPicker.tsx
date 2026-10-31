import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// components
import { TagSelector } from "@/features/notes/components/TagSelector";

import type { TagPickerProps } from "./types";
import "./styles.css";

/**
 * "+ Tag" button with a popover TagSelector. Stays open to pick several;
 * closes on Escape (without leaving the note) or a press outside.
 */
function TagPicker(props: TagPickerProps) {
  const { disabled = false, ...selectorProps } = props;

  const { t } = useTranslation();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // A press outside the picker closes it
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="tag-picker">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="tag-picker-trigger sito-ui-pressable"
      >
        <FontAwesomeIcon icon={faPlus} />
        {t("_pages:tags.add")}
      </button>
      {open ? (
        <div id={panelId} className="tag-picker-panel">
          <TagSelector {...selectorProps} onEscape={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}

export default TagPicker;
