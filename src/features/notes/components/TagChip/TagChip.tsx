// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import type { TagChipProps } from "./types";
import "./styles.css";

/** Tag name with its color dot; removable when `onRemove` is given */
function TagChip(props: TagChipProps) {
  const { tag, onRemove, removeLabel, className = "" } = props;

  return (
    <span className={`tag-chip ${className}`}>
      <span
        aria-hidden="true"
        className="tag-chip-dot"
        style={tag.color ? { backgroundColor: tag.color } : undefined}
      />
      <span className="tag-chip-name">{tag.name}</span>
      {onRemove ? (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className="tag-chip-remove"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      ) : null}
    </span>
  );
}

export default TagChip;
