import { useState } from "react";
import { scrollTo } from "some-javascript-utils/browser";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

// styles
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

// @sito/ui
import { Loading, Button } from "@sito/ui";

// sections
import SearchWrapper from "./sections/SearchWrapper";
import TypesTabs from "./sections/TypesTabs";
import Notes from "./sections/Notes";

function Home() {
  const [sync, setSync] = useState(false);

  return (
    <main className="flex flex-col viewport">
      <div className="p-10 sm:p-3 mt-20 !pb-5 flex flex-col gap-5 flex-1">
        <h2 className="text-6xl xs:text-4xl -mb-3">Mis notas</h2>
        <SearchWrapper />

        <TypesTabs />
        <Notes setSync={setSync} />
        <div
          className={`w-10 h-10 fixed bottom-1 left-1 transition-all duration-300 ease-in-out ${
            sync ? "scale-100" : "scale-0"
          } pointer-events-none`}
        >
          <Loading className="sync rounded-full" strokeWidth="8" />
        </div>
      </div>
      <Button onClick={() => scrollTo(0, 0)} className="w-full rounded-none">
        <FontAwesomeIcon icon={faChevronUp} />
      </Button>
    </main>
  );
}

export default Home;
