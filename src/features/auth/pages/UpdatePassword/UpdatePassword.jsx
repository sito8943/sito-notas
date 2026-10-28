import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../../shared/routes";
import { deleteCookie } from "some-javascript-utils/browser";
import { css } from "@emotion/css";

// @sito/ui
import { useToast, Spinner, IconButton, Button } from "@sito/ui";

// components
import { InputControl } from "../../../../shared/components/molecules/InputControl";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

// providers
import { useAppApiClient } from "../../../../shared/providers/ApiClientProvider";

// config
import config from "../../../../shared/config";

// styles
import "../styles.css";

const transition = css({
  transition: "opacity, transform",
  transitionDuration: "500ms",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
});

/**
 * UpdatePassword page
 * @returns UpdatePassword page component
 */
function UpdatePassword() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const appApiClient = useAppApiClient();

  const toast = useToast();

  const [appear, setAppear] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const handlePassword = (e) => setPassword(e.target.value);

  const toggleShowPassword = () => setShowPassword((oldValue) => !oldValue);

  const [rPassword, setRPassword] = useState("");
  const [showRPassword, setRShowPassword] = useState(false);

  const handleRPassword = (e) => setRPassword(e.target.value);

  const toggleRShowPassword = () => setRShowPassword((oldValue) => !oldValue);

  const [saving, setSaving] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSaving(true);
      setPasswordHelperText("");

      if (!password.length) {
        document.getElementById("password")?.focus();
        setPasswordHelperText(t("_accessibility:errors.passwordRequired"));
        setSaving(false);
        return;
      }
      if (password !== rPassword) {
        setSaving(false);
        setPasswordHelperText(t("_accessibility:errors.passwordsDoNotMatch"));
        return;
      }
      try {
        await appApiClient.User.updatePassword(password);
        toast({
          message: t("_pages:auth.updatePassword.sent"),
          color: "success",
        });

        deleteCookie(config.recovering);
        setTimeout(() => navigate(AppRoute.SignOut), 2000);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        // set server status to notification
        toast({
          message: err?.message ?? t("_accessibility:errors.unknown"),
          color: "error",
        });
      }
      setSaving(false);
    },
    [appApiClient.User, navigate, password, rPassword, t, toast],
  );

  useEffect(() => {
    setTimeout(() => {
      setAppear(true);
    }, 1100);
  }, []);

  return (
    <>
      <div
        className={`bg-light-dark dark:bg-dark-dark fixed top-0 left-0 z-10 w-full h-screen flex items-center backdrop-blur-[1rem] ${transition} duration-100 ${
          saving ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`m-auto text-5xl primary ${transition} duration-300! ${
            saving ? "scale-100" : "scale-0"
          }`}
        >
          <Spinner label={t("_accessibility:appName")} />
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className="form bg-light-dark dark:bg-dark-dark appear"
      >
        <Link
          to={AppRoute.Auth}
          className={`flex gap-2 items-start flex-col ${transition} delay-100! ${
            appear ? "translate-y-0 opacity-100" : "opacity-0 translate-y-1"
          }`}
        >
          <h2 className={`w-full text-2xl md:text-3xl font-bold`}>
            {t("_pages:auth.updatePassword.title")}
          </h2>
        </Link>

        <div
          className={`${transition} delay-300! ${
            appear ? "translate-y-0 opacity-100" : "opacity-0 translate-y-1"
          }`}
        >
          <InputControl
            id="password"
            className={`sign-in-input`}
            value={password}
            onChange={handlePassword}
            type={!showPassword ? "password" : "text"}
            label={t("_accessibility:inputs.password.label")}
            leftComponent={
              <IconButton
                tabIndex={-1}
                name="toggle-see-password"
                onClick={toggleShowPassword}
                icon={
                  <FontAwesomeIcon icon={showPassword ? faLockOpen : faLock} />
                }
                aria-label={`${t(
                  `_accessibility:inputs.password.${
                    showPassword ? "showPassword" : "hidePassword"
                  }`,
                )}`}
              />
            }
            helperText={passwordHelperText}
          />
        </div>
        <div
          className={`${transition} delay-300! ${
            appear ? "translate-y-0 opacity-100" : "opacity-0 translate-y-1"
          }`}
        >
          <InputControl
            id="rPassword"
            className={`sign-in-input`}
            value={rPassword}
            onChange={handleRPassword}
            type={!showRPassword ? "password" : "text"}
            label={t("_accessibility:inputs.rPassword")}
            leftComponent={
              <IconButton
                tabIndex={-1}
                name="toggle-see-r-password"
                onClick={toggleRShowPassword}
                icon={
                  <FontAwesomeIcon icon={showRPassword ? faLockOpen : faLock} />
                }
                aria-label={`${t(
                  `_accessibility:inputs.password.${
                    showRPassword ? "showPassword" : "hidePassword"
                  }`,
                )}`}
              />
            }
          />
        </div>
        <div className="w-full flex gap-5 justify-end items-center">
          <Button
            name="login"
            type="submit"
            color="primary"
            variant="submit"
            aria-label={t("_pages:auth.signIn.signInAriaLabel")}
            className={`duration-500 ease-in-out delay-500 ${
              appear ? "translate-y-0 opacity-100" : "opacity-0 translate-y-1"
            }`}
          >
            {t("_accessibility:buttons.submit")}
          </Button>
        </div>
      </form>
    </>
  );
}

export default UpdatePassword;
