import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

// utils
import { utilsToggleTheme } from "../../../utils/functions";

// contexts
import { useMode } from "../../../contexts/ModeProvider";
import SearchWrapper from "./SearchWrapper/SearchWrapper";

export default function Navbar() {
  const { modeState, toggleModeState } = useMode();

  return (
    <header className="w-full fixed top-0 left-0 z-50 dark:bg-dark-background2 bg-light-background">
      <nav className="w-full flex items-center h-full py-5 px-5 justify-between">
        <h1 className="text-3xl text-sdark dark:text-secondary font-bold uppercase">
          <FontAwesomeIcon icon={faNoteSticky} className="rotate-[30deg]" />{" "}
          Sito Notas
        </h1>
        <div className="flex gap-3 items-center">
          <SearchWrapper />
          <button
            name="toggle-theme"
            onClick={() => {
              toggleModeState();
              utilsToggleTheme();
            }}
            className="icon-button secondary"
            aria-label="Click para cambiar el tema"
          >
            <FontAwesomeIcon icon={modeState ? faSun : faMoon} />
          </button>
        </div>
      </nav>
    </header>
  );
}
