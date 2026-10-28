import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { createCookie } from "some-javascript-utils/browser";
import { css } from "@emotion/css";

// @sito/ui
import { useToast, Spinner, Button } from "@sito/ui";

// components
import { InputControl } from "../../components/InputControl";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// providers
import { useAppApiClient } from "../../providers/AppApiProvider";

// config
import config from "../../config";

// styles
import "./styles.css";

const transition = css({
  transition: "opacity, transform",
  transitionDuration: "500ms",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
});

/**
 * Recovery page
 * @returns Recovery page component
 */
function Recovery() {
  const { t } = useTranslation();

  const appApiClient = useAppApiClient();

  const [user, setUser] = useState("");
  const [userHelperText, setUserHelperText] = useState("");

  const handleUser = (e) => setUser(e.target.value);

  const [appear, setAppear] = useState(false);
  const [saving, setSaving] = useState(false);

  const toast = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setUserHelperText("");

    if (!user.length) {
      document.getElementById("user")?.focus();
      setUserHelperText(t("_accessibility:errors.emailRequired"));
      setSaving(false);
      return;
    }

    try {
      const response = await appApiClient.User.recovery(user);
      const data = await response.json();
      if (data !== null && data.status && data.status !== 200)
        toast({
          message: data.message ?? t("_accessibility:errors.unknown"),
          color: "error",
        });
      else {
        toast({ message: t("_pages:auth.recovery.sent"), color: "success" });
        createCookie(config.recovering, 1, user);
      }
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
  };

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
          to="/auth"
          className={`flex gap-2 items-start flex-col ${transition} delay-100! ${
            appear ? "translate-y-0 opacity-100" : "opacity-0 translate-y-1"
          }`}
        >
          <h2 className={`w-full text-2xl md:text-3xl font-bold`}>
            {t("_pages:auth.recovery.title")}
          </h2>
        </Link>

        <div
          className={`${transition} delay-200! ${
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
              <FontAwesomeIcon className="primary" icon={faUser} />
            }
            helperText={userHelperText}
            helperTextClassName="error"
          />
        </div>
        <div
          className={`w-full flex gap-5 justify-end items-center duration-500 ease-in-out delay-500 ${
            appear ? "translate-y-0 opacity-100" : "opacity-0 translate-y-1"
          }`}
        >
          <Button
            name="login"
            type="submit"
            color="primary"
            variant="submit"
            aria-label={t("_pages:auth.signIn.signInAriaLabel")}
          >
            {t("_accessibility:buttons.submit")}
          </Button>
        </div>
      </form>
    </>
  );
}

export default Recovery;
