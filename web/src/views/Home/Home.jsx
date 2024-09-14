import { scrollTo } from "some-javascript-utils/browser";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

// styles
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

// @sito/ui
import { Button } from "@sito/ui";

// sections
import SearchWrapper from "./sections/SearchWrapper";
import Notes from "./sections/Notes";

function Home() {
  return (
    <main className="flex flex-col viewport">
      <div className="p-10 sm:p-3 mt-20 !pb-5 flex flex-col gap-5 flex-1">
        <h2 className="text-6xl xs:text-4xl -mb-3">Mis notas</h2>
        <SearchWrapper />
        <Notes />
      </div>
      <Button
        shape="filled"
        onClick={() => scrollTo(0, 0)}
        className="fixed rounded-full p-6 bottom-20 right-5 w-0 h-0"
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </Button>
    </main>
  );
}

export default Home;
