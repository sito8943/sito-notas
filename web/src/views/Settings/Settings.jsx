import { useState } from "react";
import { Link } from "react-router-dom";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { IconButton, useStyle } from "@sito/ui";

// components
import Syncing from "../../components/Syncing/Syncing";

// sections
import Password from "./sections/Password";

function Settings() {
  const [sync, setSync] = useState(false);

  const { colors } = useStyle();

  return (
    <main className="flex flex-col viewport">
      <div className="p-10 sm:p-3 pt-20 mt-20 flex flex-col gap-10 flex-1">
        <div
          className={`w-10 h-10 fixed bottom-1 left-1 transition-all duration-300 ease-in-out ${
            sync ? "scale-100" : "scale-0"
          } pointer-events-none primary filled rounded-full`}
        >
          <Syncing />
        </div>
        <div className="flex items-center">
          <Link to="/" name="link-go-back" aria-label="Ir al inicio">
            <IconButton
              tooltip="Ir al inicio"
              name="go-back"
              aria-label="Ir al inicio"
              icon={faChevronLeft}
            />
          </Link>
          <h2 className="text-6xl md:text-5xl sm:text-4xl xs:text-3xl">
            Configuración
          </h2>
        </div>
        <Password />
      </div>
    </main>
  );
}

export default Settings;
