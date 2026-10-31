import { TAG_COLORS } from "@/features/notes/constants";

import type { TagColorPickerProps } from "./types";
import "./styles.css";

/** Palette of tag colors as a radio group of dots */
function TagColorPicker(props: TagColorPickerProps) {
  const { value, onChange, label, disabled = false } = props;
  const current = value?.toUpperCase();

  return (
    <div role="radiogroup" aria-label={label} className="tag-color-picker">
      {TAG_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          role="radio"
          aria-checked={current === color}
          aria-label={color}
          disabled={disabled}
          onClick={() => onChange(color)}
          className={`tag-color-picker-dot ${current === color ? "selected" : ""}`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

export default TagColorPicker;
