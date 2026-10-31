import { useMemo, useState, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

// utils
import { TAG_NAME_MAX_LENGTH } from "@/features/notes/constants";

import type { TagSelectorProps } from "./types";
import { getTagSelectorOptions } from "./utils";
import "./styles.css";

/**
 * Search box and list to toggle tags on a note; the search text can create
 * a new tag. Enter picks the first option.
 */
function TagSelector(props: TagSelectorProps) {
  const {
    tags,
    selectedIds,
    onToggle,
    onCreate,
    creating = false,
    onEscape,
    className = "",
  } = props;

  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const options = useMemo(
    () => getTagSelectorOptions(tags, query),
    [tags, query],
  );

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && onEscape) {
      // Handled here: the note page must not take it as "leave the note"
      event.preventDefault();
      event.stopPropagation();
      onEscape();
      return;
    }
    if (event.key !== "Enter" || !query.trim()) return;
    event.preventDefault();
    const [first] = options;
    if (!first) return;
    if (first.type === "tag") onToggle(first.tag);
    else if (!creating) onCreate(first.name);
    setQuery("");
  };

  return (
    <div className={`tag-selector ${className}`} onKeyDown={onKeyDown}>
      <input
        autoFocus
        value={query}
        maxLength={TAG_NAME_MAX_LENGTH}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("_pages:tags.searchOrCreate")}
        aria-label={t("_pages:tags.searchOrCreate")}
        className="tag-selector-search"
      />
      <ul role="listbox" aria-multiselectable className="tag-selector-list">
        {options.map((option) =>
          option.type === "tag" ? (
            <li key={option.tag.id}>
              <button
                type="button"
                role="option"
                aria-selected={selectedIds.includes(option.tag.id)}
                onClick={() => onToggle(option.tag)}
                className="tag-selector-option"
              >
                <span
                  aria-hidden="true"
                  className="tag-selector-dot"
                  style={
                    option.tag.color
                      ? { backgroundColor: option.tag.color }
                      : undefined
                  }
                />
                <span className="tag-selector-name">{option.tag.name}</span>
                {selectedIds.includes(option.tag.id) ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="tag-selector-check"
                  />
                ) : null}
              </button>
            </li>
          ) : (
            <li key="create">
              <button
                type="button"
                disabled={creating}
                onClick={() => {
                  onCreate(option.name);
                  setQuery("");
                }}
                className="tag-selector-option create"
              >
                <FontAwesomeIcon icon={faPlus} />
                <span className="tag-selector-name">
                  {t("_pages:tags.create", { name: option.name })}
                </span>
              </button>
            </li>
          ),
        )}
        {options.length === 0 ? (
          <li className="tag-selector-empty">{t("_pages:tags.noTags")}</li>
        ) : null}
      </ul>
    </div>
  );
}

export default TagSelector;
