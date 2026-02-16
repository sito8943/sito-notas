import { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Syncing from "../../components/Syncing/Syncing";

// sections
import Password from "./sections/Password";

function Settings() {
  const { t } = useTranslation();

  const [sync, setSync] = useState(false);

  return (
    <main className="flex flex-col">
      <div className="p-10 sm:p-3 flex flex-col gap-5 flex-1 h-full overflow-auto">
        <div
          className={`w-10 h-10 fixed bottom-1 left-1 transition-all duration-300 ease-in-out ${
            sync ? "scale-100" : "scale-0"
          } pointer-events-none primary filled rounded-full`}
        >
          <Syncing />
        </div>
        <div className="flex items-center">
          <h2 className="text-6xl md:text-5xl sm:text-4xl xs:text-3xl">
            {t("_pages:settings.title")}
          </h2>
        </div>
        <Password />
      </div>
    </main>
  );
}

export default Settings;
