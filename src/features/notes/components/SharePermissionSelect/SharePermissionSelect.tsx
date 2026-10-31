import { useTranslation } from "react-i18next";

// components
import { Select, SelectPlacement } from "@/shared/components/molecules/Select";

import { SHARE_PERMISSION_OPTIONS } from "./constants";
import type { SharePermissionSelectProps } from "./types";

/** "Can view" / "Can edit" picker of a share */
function SharePermissionSelect(props: SharePermissionSelectProps) {
  const {
    value,
    onChange,
    label,
    placement = SelectPlacement.BottomEnd,
    disabled = false,
  } = props;

  const { t } = useTranslation();

  const options = SHARE_PERMISSION_OPTIONS.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
  }));

  return (
    <Select
      value={value}
      options={options}
      onChange={onChange}
      label={label}
      placement={placement}
      disabled={disabled}
    />
  );
}

export default SharePermissionSelect;
