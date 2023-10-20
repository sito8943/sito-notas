import React from "react";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

// components
import FAB from "./FAB";

// contexts
import { useMode } from "../../contexts/ModeProvider";

// utils
import { utilsToggleTheme } from "../../utils/functions";

function ModeButton({ className }) {
  const { modeState, toggleModeState } = useMode();

  return (
    <FAB
      onClick={() => {
        toggleModeState();
        utilsToggleTheme();
      }}
      tooltip="Alternar tema (Claro/Oscuro)"
      name="toggle-theme"
      aria-label="Click para cambiar el tema"
      icon={modeState ? faSun : faMoon}
      className={className}
    />
  );
}

export default ModeButton;
