import { useTranslation } from "react-i18next";

import { LogoMark } from "../LogoMark";
import type { LogoProps } from "./types";

/** App logo: "N" mark above the wordmark */
function Logo({ className = "" }: LogoProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex w-full flex-col items-center gap-3 primary ${className}`}
    >
      <LogoMark className="h-16 w-auto" />
      <span className="font-[family-name:Poppins] text-4xl font-bold">
        {t("_accessibility:appName")}
      </span>
    </div>
  );
}

export default Logo;
