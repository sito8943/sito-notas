import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

// providers
import { ThemeMode, useTheme } from "@/shared/providers/ThemeProvider";

// components
import { FAB } from "@/shared/components/atoms/FAB";

import type { ModeButtonProps } from "./types";

function ModeButton(props: ModeButtonProps) {
  const { className, color = "secondary" } = props;

  const { toggleMode, mode } = useTheme();

  const { t } = useTranslation();

  return (
    <FAB
      onClick={() => toggleMode()}
      name="toggle-theme"
      variant="text"
      color={color}
      data-tooltip-id="tooltip"
      data-tooltip-content={
        mode === ThemeMode.Dark
          ? t("_accessibility:ariaLabels.lightMode")
          : t("_accessibility:ariaLabels.darkMode")
      }
      aria-label={
        mode === ThemeMode.Dark
          ? t("_accessibility:ariaLabels.lightMode")
          : t("_accessibility:ariaLabels.darkMode")
      }
      icon={<FontAwesomeIcon icon={mode === ThemeMode.Dark ? faSun : faMoon} />}
      className={className}
    />
  );
}

export default ModeButton;
