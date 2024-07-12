import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { css } from "@emotion/css";

// @sito/ui
import {
  useNotification,
  Loading,
  InputControl,
  IconButton,
  Button,
} from "@sito/ui";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faUser } from "@fortawesome/free-solid-svg-icons";

// providers
import { useAccount } from "../../providers/AccountProvider";
import { useAppApiClient } from "../../providers/AppApiProvider";

// components
import ModeButton from "../../components/ModeButton/ModeButton";

// styles
import "./styles.css";

const transition = css({
  transition: "opacity, transform",
  transitionDuration: "500ms",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
});

function SignIn() {
  const { t } = useTranslation();

  const { logUser } = useAccount();

  const [appear, setAppear] = useState(false);

  const appApiClient = useAppApiClient();

  const { setNotification } = useNotification();

  const [user, setUser] = useState("");
  const [userHelperText, setUserHelperText] = useState("");

  const handleUser = (e) => setUser(e.target.value);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const handlePassword = (e) => setPassword(e.target.value);

  const toggleShowPassword = () => setShowPassword((oldValue) => !oldValue);

  const [saving, setSaving] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // setSaving(true);
      setUserHelperText("");
      setPasswordHelperText("");

      if (!user.length) {
        document.getElementById("user")?.focus();
        setUserHelperText(t("_accessibility:errors.emailRequired"));
        setSaving(false);
        return;
      }
      if (!password.length) {
        document.getElementById("password")?.focus();
        setPasswordHelperText(t("_accessibility:errors.passwordRequired"));
        setSaving(false);
        return;
      }

      try {
        const response = await appApiClient.User.login(user, password);
        const data = await response.json();
        if (data.status) {
          if (data.status === 404)
            setUserHelperText(
              t(`_accessibility:messages.404`, {
                model: t("_entities:entities.user"),
              })
            );
          else if (data.status === 401 || data.status === 400)
            setPasswordHelperText(t("_accessibility:messages.401"));
          else {
            const request = await appApiClient.User.fetchUserSettings(
              data.user.id
            );
            const settings = await request.json();
            if (settings) logUser({ ...data, settings });
            else logUser({ ...data });
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(e);
        // set server status to notification
        setNotification(String(e.status));
      }

      setSaving(false);
    },
    [user, password, t, appApiClient.User, logUser, setNotification]
  );

  useEffect(() => {
    setTimeout(() => {
      setAppear(true);
    }, 1100);
  }, []);

  return (
    <main className="w-full viewport flex items-center justify-center">
      <ModeButton color="primary" className="top-1 right-1" />
      <div
        className={`bg-light-dark dark:bg-dark-dark fixed top-0 left-0 z-10 w-full h-screen flex items-center backdrop-blur-[1rem] ${transition} duration-100 ${
          saving ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Loading
          className={`bg-light-default dark:bg-dark-default ${transition} !duration-300 ${
            saving ? "!h-[100px]" : "!h-[0px]"
          }`}
        />
      </div>
      <form
        onSubmit={onSubmit}
        className="form bg-light-dark dark:bg-dark-dark appear"
      >
        <div
          className={`flex gap-2 items-start flex-col ${transition} !delay-100 ${
            appear ? "translate-y-0 opacity-100" : "opacity-0 translate-y-1"
          }`}
        >
          {/* <img src={logo} alt="stick notes logo" className="w-10 h-10" /> */}
          LOGO
          <h1 className="primary uppercase text-4xl">Sito Notas</h1>
        </div>
        <div
          className={`${transition} !delay-200 ${
            appear ? "translate-y-0 opacity-100" : "opacity-0 translate-y-1"
          }`}
        >
          <InputControl
            id="user"
            label={t("_accessibility:inputs.email.label")}
            className={`sign-in-input`}
            value={user}
            onChange={handleUser}
            leftComponent={
              <div className="icon-button button -ml-3">
                <FontAwesomeIcon className="primary" icon={faUser} />
              </div>
            }
            helperText={userHelperText}
          />
        </div>
        <div
          className={`${transition} !delay-300 ${
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
                className="-ml-3"
                aria-label={`${t(
                  `_accessibility:inputs.password.${
                    showPassword ? "showPassword" : "hidePassword"
                  }`
                )}`}
              />
            }
            helperText={passwordHelperText}
          />
        </div>
        <div className="w-full mb-5">
          <Link
            to="/auth/recovery"
            className={`underline text-left ${transition} !delay-[400ms] ${
              appear ? "translate-y-0 opacity-100" : "opacity-0 translate-y-1"
            }`}
          >
            {t("_pages:auth.signIn.passwordRecovery")}
          </Link>
        </div>
        <div className="w-full flex gap-5 justify-end items-center">
          <Button
            name="login"
            type="submit"
            color="primary"
            shape="filled"
            aria-label={t("_pages:auth.signIn.signInAriaLabel")}
            className={`duration-500 ease-in-out delay-[500ms] ${
              appear ? "translate-y-0 opacity-100" : "opacity-0 translate-y-1"
            }`}
          >
            {saving && (
              <Loading
                className="bg-primary w-full h-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-lg "
                strokeWidth="4"
                loaderClass="!w-6"
                color="stroke-white"
              />
            )}
            {t("_accessibility:buttons.signIn")}
          </Button>
        </div>
      </form>
    </main>
  );
}

export default SignIn;
