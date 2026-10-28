import { useState, type ChangeEvent, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

// icons
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// @sito/ui
import { useToast, IconButton, Button } from "@sito/ui";

// components
import { InputControl } from "@/shared/components/molecules/InputControl";

// services
import { useAppApiClient } from "@/shared/providers/ApiClientProvider";

function Password() {
  const { t } = useTranslation();

  const appApiClient = useAppApiClient();
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const toggleShowPassword = () => setShowPassword((oldValue) => !oldValue);

  const [rPassword, setRPassword] = useState("");
  const [showRPassword, setShowRPassword] = useState(false);

  const handleRPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setRPassword(e.target.value);

  const toggleShowRPassword = () => setShowRPassword((oldValue) => !oldValue);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordHelperText("");
    if (!password.length) {
      document.getElementById("password")?.focus();
      setPasswordHelperText(t("_accessibility:inputs.password.requiredError"));
      return;
    }
    if (password !== rPassword) {
      document.getElementById("password")?.focus();
      setPasswordHelperText(t("_accessibility:errors.passwordsDoNotMatch"));
      return;
    }
    setLoading(true);
    const { error } = await appApiClient.User.updatePassword(password);
    if (error && error !== null)
      toast({ message: error.message, color: "error" });
    else {
      setPassword("");
      setRPassword("");
    }
    setLoading(false);
  };

  return (
    <section className="flex flex-col gap-3 ">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 justify-start items-start"
      >
        <h3 className="text-xl">
          {t("_pages:settings.sections.security.title")}
        </h3>
        <InputControl
          id="password"
          className="w-full"
          label={t("_accessibility:inputs.password.label")}
          maxLength={25}
          value={password}
          onChange={handlePassword}
          disabled={loading}
          type={!showPassword ? "password" : "string"}
          leftComponent={
            <IconButton
              tabIndex={-1}
              name="toggle-see-password"
              onClick={toggleShowPassword}
              icon={
                <FontAwesomeIcon icon={showPassword ? faLockOpen : faLock} />
              }
              className="-ml-3"
              aria-label={t(
                `_accessibility:inputs.password.${
                  showPassword ? "showPassword" : "hidePassword"
                }`,
              )}
            />
          }
          helperText={passwordHelperText}
        />
        <InputControl
          id="rPassword"
          className="w-full"
          label={t("_accessibility:inputs.rPassword")}
          maxLength={25}
          value={rPassword}
          onChange={handleRPassword}
          disabled={loading}
          type={!showRPassword ? "password" : "string"}
          leftComponent={
            <IconButton
              tabIndex={-1}
              name="toggle-see-r-password"
              onClick={toggleShowRPassword}
              icon={
                <FontAwesomeIcon icon={showRPassword ? faLockOpen : faLock} />
              }
              className="-ml-3"
              aria-label={t(
                `_accessibility:inputs.password.${
                  showRPassword ? "showPassword" : "hidePassword"
                }`,
              )}
            />
          }
        />
        <Button
          name="save-password"
          aria-label={`${t("_accessibility:buttons.save")} ${t(
            "_accessibility:inputs.password.label",
          )}`}
          type="submit"
          variant="submit"
          color="primary"
          loading={loading}
        >
          {t("_accessibility:buttons.save")}
        </Button>
      </form>
    </section>
  );
}

export default Password;
