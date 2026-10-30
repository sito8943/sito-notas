import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { scrollTo } from "some-javascript-utils/browser";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { IconButton } from "@sito/ui";

// sections
import { Notes } from "@/features/notes/components/Notes";
import { SearchWrapper } from "@/features/notes/components/SearchWrapper";

import "./styles.css";

function Home() {
  const { t } = useTranslation();

  const mainRef = useRef<HTMLElement>(null);

  return (
    <main ref={mainRef} className="home">
      <div className="home-content">
        <h2 className="home-title">Mis notas</h2>
        <SearchWrapper />
        <Notes />
      </div>
      <IconButton
        variant="submit"
        onClick={() => scrollTo(0, 0, mainRef.current ?? undefined)}
        aria-label={t("_accessibility:buttons.toTop")}
        icon={<FontAwesomeIcon icon={faChevronUp} />}
        className="home-to-top"
      />
    </main>
  );
}

export default Home;
