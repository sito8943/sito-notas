import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faArrowRightFromBracket,
  faMoon,
  faSun,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { IconButton, useMode } from "@sito/ui";

// providers
import { useAccount } from "../../../../providers/AccountProvider";

// images
import noPhoto from "../../../../assets/images/no-photo.webp";

function Navbar() {
  const { t } = useTranslation();

  const { account } = useAccount();
  const { toggleMode, mode } = useMode();

  const location = useLocation();

  return (
    <header className="m-auto w-full px-10">
      <div className={"flex w-full justify-between py-3"}>
        <div className="flex gap-3">
          {location.pathname !== "/" ? (
            <Link
              to="/"
              name="to-home"
              aria-label={`${t("_accessibility:ariaLabels.goTo")} ${t(
                "_pages:routes.home"
              )}`}
              className="button icon-button primary"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
          ) : (
            <Link
              aria-label={`${t("_accessibility:ariaLabels.goTo")} ${t(
                "_pages:routes.home"
              )}`}
              name="go-home"
              to="/"
              className="z-10 flex gap-2 items-center primary"
            >
              <img
                src={noPhoto}
                alt="user-photo"
                className="rounded-full w-10 h-10 object-contain"
              />
              <h1 className="capitalize text-xl">
                {account.user?.email?.split("@")[0]}
              </h1>
            </Link>
          )}
        </div>
        <nav className="z-10 flex">
          <IconButton
            color="primary"
            name="toggle-theme"
            data-tooltip-id="tooltip"
            data-tooltip-content={
              mode === "dark"
                ? t("_accessibility:ariaLabels.lightMode")
                : t("_accessibility:ariaLabels.darkMode")
            }
            onClick={() => toggleMode()}
            aria-label={
              mode === "dark"
                ? t("_accessibility:ariaLabels.lightMode")
                : t("_accessibility:ariaLabels.darkMode")
            }
            icon={<FontAwesomeIcon icon={mode === "dark" ? faSun : faMoon} />}
          />
          <Link
            to="/settings"
            name="toggle-theme"
            aria-label={`${t("_accessibility:ariaLabels.goTO")} ${t(
              "_pages:routes.settings"
            )}`}
            className="primary button icon-button normal"
          >
            <FontAwesomeIcon icon={faGear} />
          </Link>
          <Link
            to="/sign-out"
            name="logout"
            aria-label={t("_pages:routes.signOut")}
            className="button icon-button normal primary"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
