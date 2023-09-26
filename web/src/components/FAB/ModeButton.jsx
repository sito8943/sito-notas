import React from "react";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

// components
import FAB from "./FAB";

// contexts
import { useMode } from "../../contexts/ModeProvider";

function ModeButton({ className }) {
  const { modeState, toggleModeState } = useMode();

  const utilsToggleTheme = () => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <FAB
      onClick={() => {
        toggleModeState();
        utilsToggleTheme();
      }}
      icon={modeState ? faSun : faMoon}
      className={className}
    />
  );
}

export default ModeButton;
