import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { IconButton, Tooltip } from "@sito/ui";

// routes
import { AppRoute } from "@/shared/routes";

// components
import { ThemeToggle } from "@/shared/components/molecules/ThemeToggle";

import "./styles.css";

/** Header actions: theme, plus sign out on small screens (no sidebar there) */
function NavbarActions() {
  const { t } = useTranslation();

  const signOutLabel = t("_pages:routes.signOut");

  return (
    <>
      <ThemeToggle />
      <Tooltip label={signOutLabel} side="bottom" align="end">
        <IconButton
          as={Link}
          to={AppRoute.SignOut}
          color="primary"
          aria-label={signOutLabel}
          icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
          className="navbar-sign-out"
        />
      </Tooltip>
    </>
  );
}

export default NavbarActions;
