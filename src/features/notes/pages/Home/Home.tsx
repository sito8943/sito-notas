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

function Home() {
  const { t } = useTranslation();

  const mainRef = useRef<HTMLElement>(null);

  return (
    <main ref={mainRef} className="flex flex-col h-full overflow-auto">
      <div className="p-10 sm:p-3 flex flex-col gap-5 flex-1">
        <h2 className="text-6xl xs:text-4xl -mb-3">Mis notas</h2>
        <SearchWrapper />
        <Notes />
      </div>
      <IconButton
        variant="submit"
        onClick={() => scrollTo(0, 0, mainRef.current ?? undefined)}
        aria-label={t("_accessibility:buttons.toTop")}
        icon={<FontAwesomeIcon icon={faChevronUp} />}
        className="fixed bottom-20 right-5"
      />
    </main>
  );
}

export default Home;
