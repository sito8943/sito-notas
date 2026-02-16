/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  return (
    <FAB
      onClick={() => toggleMode()}
      name="toggle-theme"
      shape="text"
      color={color}
      data-tooltip-id="tooltip"
      data-tooltip-content={
        mode === "dark"
          ? t("_accessibility:ariaLabels.lightMode")
          : t("_accessibility:ariaLabels.darkMode")
      }
      aria-label={
        mode === "dark"
          ? t("_accessibility:ariaLabels.lightMode")
          : t("_accessibility:ariaLabels.darkMode")
      }
      icon={<FontAwesomeIcon icon={mode === "dark" ? faSun : faMoon} />}
      className={className}
    />
  );
}

export default ModeButton;
