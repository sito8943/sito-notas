import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";

// @sito/ui
import { useMode } from "@sito/ui";

// components
import { FAB } from "../FAB/FAB";

function ModeButton({ className, color = "secondary" }) {
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

ModeButton.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "error", "success"]),
  className: PropTypes.string,
};

export default ModeButton;
