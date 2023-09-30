import React, { useCallback, useEffect } from "react";

// @emotion/css
import { css } from "@emotion/css";

// font awesome
import { faClose } from "@fortawesome/free-solid-svg-icons";

// components
import FloatingButton from "../../../../components/FAB/FAB";

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
  "#FF00FF",
  "#FF4500",
  "#2E8B57",
  "#FF6347",
  "#DC143C",
];

function ColorBox({ onColorSelect, onClose }) {
  const onEscapePress = useCallback((e) => {
    if (e.key === "Escape") {
      onClose();
      e.target.blur();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onEscapePress);
    return () => {
      window.removeEventListener("keydown", onEscapePress);
    };
  }, []);

  return (
    <div
      role="button"
      onClick={onClose}
      name="close-color-box"
      aria-label="click para cerrar la caja de colores"
      className="fixed top-0 left-0 w-full h-screen backdrop-blur-md z-[9999] flex items-center justify-center flex-col gap-2"
    >
      <FloatingButton
        icon={faClose}
        position="top-right"
        className="secondary"
      />
      <h3 className="dark:text-white">Selecciona el color</h3>
      <div className="w-[240px] aGrow p-5 rounded-lg min-w-[150px] min-h-[150px] bg-light-background2 dark:bg-dark-background2 grid grid-cols-4 gap-1">
        {allColors.map((color) => (
          <button
            key={color}
            type="button"
            name="select-color"
            onClick={() => onColorSelect(color)}
            aria-label={`click to select the color ${color}`}
            className={`h-10 min-h-10 rounded-sm ${css({
              background: color,
              "&:hover": {
                background: `${color}aa`,
              },
            })}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorBox;
