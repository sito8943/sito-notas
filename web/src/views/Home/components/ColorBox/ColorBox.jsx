import React from "react";

// @emotion/css
import { css } from "@emotion/css";

const allColors = [
  "#FF0000",
  "#0000FF",
  "#008000",
  "#FFFF00",
  "#FF69B4",
  "#800080",
  "#222222",
  "#808080",
  "#A52A2A",
  "#40E0D0",
  "#FFB6C1",
  "#FF00FF",
  "#FF4500",
  "#2E8B57",
  "#FF6347",
  "#DC143C",
];

function ColorBox({ onColorSelect, onClose }) {
  return (
    <div className="w-[200px] aGrow fixed top-0 left-0 p-5 rounded-lg min-w-[150px] min-h-[150px] bg-dark-background2 z-50 grid grid-cols-3 gap-1">
      {allColors.map((color) => (
        <button
          key={color}
          type="button"
          name="select-color"
          onClick={() => onColorSelect(color)}
          aria-label={`click to select the color ${color}`}
          className={`h-10 min-h-10 ${css({
            background: color,
            "&:hover": {
              background: `${color}cc`,
            },
          })}`}
        />
      ))}
    </div>
  );
}

export default ColorBox;
