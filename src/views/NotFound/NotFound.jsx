import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-regular-svg-icons";

// components
import ModeButton from "../../components/ModeButton/ModeButton";

function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="w-full h-screen flex items-center justify-center flex-col gap-5">
      <ModeButton color="primary" className="top-1 right-1" />
      <FontAwesomeIcon
        icon={faSadTear}
        className="dark:text-white text-7xl appear"
      />
      <h2 className="dark:text-white text-center appear">
        404 - {t("_pages:notFound.title")}
      </h2>
      <Link
        name="go-home"
        aria-label={t("_accessibility:ariaLabels.goHome")}
        to="/"
        className="primary button filled appear"
      >
        {t("_accessibility:buttons.goHome")}
      </Link>
    </main>
  );
}

export default NotFound;
