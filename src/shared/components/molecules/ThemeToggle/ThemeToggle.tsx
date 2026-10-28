import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { IconButton, Tooltip } from "@sito/ui";

// providers
import { ThemeMode, useTheme } from "@/shared/providers/ThemeProvider";

import type { ThemeToggleProps } from "./types";

function ThemeToggle(props: ThemeToggleProps) {
  const { color = "primary", size, tooltipSide = "bottom", className } = props;

  const { t } = useTranslation();
  const { mode, toggleMode } = useTheme();

  const isDark = mode === ThemeMode.Dark;
  const label = isDark
    ? t("_accessibility:ariaLabels.lightMode")
    : t("_accessibility:ariaLabels.darkMode");

  return (
    <Tooltip label={label} side={tooltipSide}>
      <IconButton
        color={color}
        size={size}
        aria-label={label}
        onClick={toggleMode}
        icon={<FontAwesomeIcon icon={isDark ? faSun : faMoon} />}
        className={className}
      />
    </Tooltip>
  );
}

export default ThemeToggle;
