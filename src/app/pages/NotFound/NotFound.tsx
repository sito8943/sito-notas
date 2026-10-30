import { Link } from "react-router-dom";
import { AppRoute } from "@/shared/routes";
import { useTranslation } from "react-i18next";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-regular-svg-icons";

// @sito/ui
import { Button } from "@sito/ui";

// components
import { ThemeToggle } from "@/shared/components/molecules/ThemeToggle";

import "./styles.css";

function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="not-found">
      <div className="not-found-theme-toggle">
        <ThemeToggle />
      </div>
      <FontAwesomeIcon icon={faSadTear} className="not-found-icon appear" />
      <h2 className="not-found-title appear">
        404 - {t("_pages:notFound.title")}
      </h2>
      <Button
        as={Link}
        aria-label={t("_accessibility:ariaLabels.goHome")}
        to={AppRoute.Home}
        variant="submit"
        color="primary"
        className="appear"
      >
        {t("_accessibility:buttons.goHome")}
      </Button>
    </main>
  );
}

export default NotFound;
