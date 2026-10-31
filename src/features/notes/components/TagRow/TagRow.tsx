import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// @sito/ui
import { ICON_BUTTON_SIZES, IconButton, Tooltip } from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// components
import { TagColorPicker } from "@/features/notes/components/TagColorPicker";

// utils
import { TAG_NAME_MAX_LENGTH } from "@/features/notes/constants";
import { normalizeTagName } from "@/features/notes/utils";

import type { TagRowProps } from "./types";
import "./styles.css";

/**
 * One tag on the tags page: rename in place (saved on Enter or blur),
 * pick a color, see how many notes use it, delete it
 */
function TagRow(props: TagRowProps) {
  const {
    tag,
    count,
    onRename,
    onRecolor,
    onDelete,
    isNameTaken,
    disabled = false,
  } = props;

  const { t } = useTranslation();
  const [name, setName] = useState(tag.name);
  const [error, setError] = useState(false);

  // The server name wins once a save lands (or another device renames it)
  useEffect(() => setName(tag.name), [tag.name]);

  const commit = () => {
    const next = normalizeTagName(name);
    setError(false);
    if (!next || next === tag.name) {
      setName(tag.name);
      return;
    }
    if (isNameTaken(next)) {
      setError(true);
      return;
    }
    onRename(next);
  };

  const deleteLabel = t("_pages:tags.delete");

  return (
    // Named per tag so View Transitions move/fade this row (withViewTransition)
    <li className="tag-row" style={{ viewTransitionName: `tag-${tag.id}` }}>
      <div className="tag-row-main">
        <input
          value={name}
          maxLength={TAG_NAME_MAX_LENGTH}
          disabled={disabled}
          aria-label={t("_pages:tags.nameLabel")}
          aria-invalid={error}
          onChange={(event) => {
            setName(event.target.value);
            setError(false);
          }}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.currentTarget.blur();
          }}
          className={`tag-row-name ${error ? "invalid" : ""}`}
        />
        <p className={`tag-row-meta ${error ? "error" : ""}`}>
          {error
            ? t("_pages:tags.errors.exists")
            : t("_pages:tags.count", { count })}
        </p>
      </div>
      <TagColorPicker
        value={tag.color}
        onChange={onRecolor}
        label={t("_pages:tags.colorLabel", { name: tag.name })}
        disabled={disabled}
      />
      <Tooltip label={deleteLabel} align="end">
        <IconButton
          color="error"
          size={ICON_BUTTON_SIZES.SM}
          aria-label={deleteLabel}
          disabled={disabled}
          onClick={onDelete}
          icon={<FontAwesomeIcon icon={faTrash} />}
        />
      </Tooltip>
    </li>
  );
}

export default TagRow;
