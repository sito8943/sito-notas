import { useState } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { IconButton } from "@sito/ui";

import { TextInput } from "@/shared/components/molecules/TextInput";
import type { PasswordInputProps } from "./types";

/** Text input with a show/hide password toggle */
function PasswordInput(props: PasswordInputProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  return (
    <TextInput
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={
        <IconButton
          type="button"
          size="sm"
          tabIndex={-1}
          aria-label={t(
            visible
              ? "_accessibility:inputs.password.hidePassword"
              : "_accessibility:inputs.password.showPassword",
          )}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
          icon={<FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />}
        />
      }
    />
  );
}

export default PasswordInput;
