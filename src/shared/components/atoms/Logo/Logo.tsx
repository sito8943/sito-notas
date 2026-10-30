import { useTranslation } from "react-i18next";

import { LogoMark } from "@/shared/components/atoms/LogoMark";
import type { LogoProps } from "./types";
import "./styles.css";

/** App logo: "N" mark above the wordmark */
function Logo({ className = "" }: LogoProps) {
  const { t } = useTranslation();

  return (
    <div className={`logo primary ${className}`}>
      <LogoMark className="logo-mark" />
      <span className="logo-name">{t("_accessibility:appName")}</span>
    </div>
  );
}

export default Logo;
