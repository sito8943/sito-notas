import { useTranslation } from "react-i18next";

import { SHARE_PERMISSION_OPTIONS } from "./constants";
import type { SharePermissionSelectProps } from "./types";
import { toSharePermission } from "./utils";
import "./styles.css";

/** "Can view" / "Can edit" picker of a share */
function SharePermissionSelect(props: SharePermissionSelectProps) {
  const { value, onChange, label, disabled = false } = props;

  const { t } = useTranslation();

  return (
    <select
      value={value}
      onChange={(event) => onChange(toSharePermission(event.target.value))}
      aria-label={label}
      disabled={disabled}
      className="share-permission-select"
    >
      {SHARE_PERMISSION_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {t(option.labelKey)}
        </option>
      ))}
    </select>
  );
}

export default SharePermissionSelect;
