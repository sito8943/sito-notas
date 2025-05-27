/* eslint-disable react/prop-types */
import Tippy from "@tippyjs/react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { useMode } from "@sito/ui";

// components
import { FAB } from "../FAB/FAB";

function ModeButton(props) {
  const { className, color = "secondary" } = props;

  const { toggleMode, mode } = useMode();

  return (
    <Tippy content="Alternar tema (Claro/Oscuro)">
      <div>
        <FAB
          onClick={() => toggleMode()}
          name="toggle-theme"
          shape="text"
          color={color}
          aria-label="Click para cambiar el tema"
          icon={<FontAwesomeIcon icon={mode === "dark" ? faSun : faMoon} />}
          className={className}
        />
      </div>
    </Tippy>
  );
}

export default ModeButton;
