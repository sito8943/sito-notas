import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  faSignOut,
  faSun,
  faMoon,
  faBars,
  faListDots,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

// utils
import { utilsToggleTheme } from "../../../utils/functions";

// contexts
import { useMode } from "../../../contexts/ModeProvider";
import { useUser } from "../../../contexts/UserProvider";
import { useSidebar } from "../../../contexts/SidebarProvider";

// components
import SearchWrapper from "./SearchWrapper/SearchWrapper";
import IconButton from "../../../components/IconButton/IconButton";

// images
import logo from "../../../assets/images/logo.png";

export default function Navbar() {
  const { modeState, toggleModeState } = useMode();

  const { userState, setUserState } = useUser();

  const toggleLegacy = () => setUserState({ type: "toggle-legacy" });

  const legacy = useMemo(() => userState.user?.legacy === "1", [userState]);

  const { sidebarState, toggleSidebarState } = useSidebar();

  return (
    <header className="w-full fixed top-0 left-0 z-50 dark:bg-dark-background2 bg-light-background">
      <nav className="nav w-full flex items-center h-full py-5 px-3 justify-between flex-wrap">
        <div className="flex gap-2 items-center">
          <IconButton
            name="toggle-sidebar"
            onClick={toggleSidebarState}
            icon={sidebarState ? faEllipsisV : faListDots}
            tooltip={
              sidebarState ? "Cerrar barra lateral" : "Abrir barra lateral"
            }
            className={`icon-button secondary toggle-sidebar`}
            aria-label="Click para alternar barra lateral"
          />
          <img src={logo} alt="stick notes logo" className="w-10 h-10" />
          <h1 className="text-sdark dark:text-secondary uppercase">
            Sito Notas
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          {!legacy ? <SearchWrapper /> : null}
          <Link to="/sign-out">
            <IconButton
              name="sign-out"
              tooltip="Cerrar sesión"
              icon={faSignOut}
              className="icon-button secondary"
              aria-label="Click para cerrar sesión"
            />
          </Link>
          <IconButton
            name="toggle-legacy"
            onClick={toggleLegacy}
            tooltip={legacy ? "Modo Grid" : "Modo Lista"}
            icon={faBars}
            className={`icon-button secondary ${
              legacy ? "rotate-90" : ""
            } transition-all duration-300 `}
            aria-label="Click para alternar vista"
          />
          <IconButton
            name="toggle-theme"
            onClick={() => {
              toggleModeState();
              utilsToggleTheme();
            }}
            tooltip={!modeState ? "Tema claro" : "Tema oscuro  "}
            icon={!modeState ? faSun : faMoon}
            className="icon-button secondary"
            aria-label="Click para cambiar el tema"
          />
        </div>
      </nav>
    </header>
  );
}
