import { useState } from "react";

// styles
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

// @sito/ui
import { Button, IconButton, Loading } from "@sito/ui";

// sections
import SearchWrapper from "./sections/SearchWrapper";
import TypesTabs from "./sections/TypesTabs";
import Notes from "./sections/Notes";
import { faBuilding, faSmile } from "@fortawesome/free-regular-svg-icons";

function Home() {
  const [sync, setSync] = useState(false);

  return (
    <main className="flex flex-col viewport">
      <div className="p-10 sm:p-3 mt-20 !pb-10 flex flex-col gap-5 flex-1">
        <h2 className="text-6xl xs:text-4xl -mb-3">Mis notas</h2>
        <SearchWrapper />
        <Button className="primary">Primary</Button>
        <Button className="primary submit">Submit</Button>
        <Button className="primary outlined">Outlined</Button>
        <div className="flex gap-3">
          <IconButton icon={faSmile} className="primary" />
          <IconButton icon={faSmile} className="primary submit" />
          <IconButton icon={faSmile} className="primary outlined" />
        </div>
        <Button className="secondary">Primary</Button>
        <Button color="secondary" className="submit">
          Submit
        </Button>
        <Button color="secondary" className="outlined">
          Outlined
        </Button>
        <div className="flex gap-3">
          <IconButton icon={faSmile} className="secondary" />
          <IconButton
            icon={faSmile}
            color="secondary"
            className="secondary submit"
          />
          <IconButton
            icon={faSmile}
            color="secondary"
            className="secondary outlined"
          />
        </div>
        <Button className="ternary">Primary</Button>
        <Button color="ternary" className="submit">
          Submit
        </Button>
        <Button color="ternary" className="outlined">
          Outlined
        </Button>
        <div className="flex gap-3">
          <IconButton icon={faSmile} className="ternary" />
          <IconButton
            icon={faSmile}
            color="ternary"
            className="ternary submit"
          />
          <IconButton
            icon={faSmile}
            color="ternary"
            className="ternary outlined"
          />
        </div>
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
    </main>
  );
}

export default Home;
