import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCookie } from "some-javascript-utils/browser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faUser } from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";

// contexts
import { useUser } from "../../contexts/UserProvider";
import { useNotification } from "../../contexts/NotificationProvider";

// components
import Switch from "../../components/Switch/Switch";
import Loading from "../../components/Loading/Loading";
import ModeButton from "../../components/FAB/ModeButton";
import SimpleInput from "../../components/SimpleInput/SimpleInput";

// services
import { login } from "../../services/auth";

// utils
import { logUser } from "../../utils/auth";

import config from "../../config";

// images
import noPhoto from "../../assets/images/no-photo.webp";

function SignIn() {
  const { setNotificationState } = useNotification();

  const [user, setUser] = useState("");
  const [userHelperText, setUserHelperText] = useState("");

  const handleUser = useCallback((e) => {
    setUser(e.target.value);
  }, []);

  const [remember, setRemember] = useState(false);

  const handleRemember = useCallback(() => {
    setRemember(!remember);
  }, [remember]);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const handlePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const navigate = useNavigate();

  const { setUserState } = useUser();

  const [loading, setLoading] = useState(false);

  const showNotification = useCallback(
    (ntype, message) =>
      setNotificationState({
        type: "set",
        ntype,
        message,
      }),
    [setNotificationState]
  );

  const onSubmit = useCallback(
    async (e) => {
      setUserHelperText("");
      setPasswordHelperText("");
      e.preventDefault();
      if (!user.length) {
        document.getElementById("user")?.focus();
        setUserHelperText("Debes introducir un usuario");
        return;
      }
      if (!password.length) {
        document.getElementById("password")?.focus();
        setPasswordHelperText("Debes introducir tu contraseña");
        return;
      }
      try {
        setLoading(true);
        const response = await login(user, password, remember);
        const { data } = response;
        const { expiration, token, state, permissions } = data;
        createCookie(config.basicKey, expiration, token);
        logUser({
          id: data.id,
          user: data.user,
          photo: `${config.apiPhoto}${data.photo}` || noPhoto,
          state: data.state,
          permissions,
        });
        setUserState({
          type: "logged-in",
          user: {
            id: data.id,
            user: data.user,
            photo: `${config.apiPhoto}${data.photo}` || noPhoto,
            state,
            permissions,
          },
        });
        navigate("/");
      } catch (err) {
        console.error(err);
        const { response } = err;
        if (String(err) === "AxiosError: Network Error")
          showNotification("error", errors.notConnected);
        else if (response) {
          const { status } = response;
          switch (status) {
            case 401:
              showNotification("error", "Usuario o contraseña incorrecta");
              break;
            default:
              showNotification("error", String(err));
              break;
          }
        } else showNotification("error", String(err));
      }
      setLoading(false);
    },
    [user, password, showNotification, navigate, remember, setUserState]
  );

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <ModeButton className="top-1 right-1 icon-button primary" />
      {loading ? (
        <Loading className="fixed-loading" />
      ) : (
        <form
          onSubmit={onSubmit}
          className="rounded-sm appear relative bg-light-background dark:bg-dark-background2 p-10 min-w-[440px] flex flex-col gap-3 shadow-xl shadow-dark-[black]"
        >
          <h1 className="text-3xl text-sdark dark:text-secondary font-bold">
            <FontAwesomeIcon icon={faNoteSticky} className="rotate-[30deg]" />{" "}
            TEAM WORK
          </h1>
          <SimpleInput
            id="user"
            className="input-control dark:text-white"
            label="Usuario"
            inputProps={{
              className: "input border-none submit !pl-8 w-full",
              value: user,
              onChange: handleUser,
              type: "string",
            }}
            leftIcon={
              <FontAwesomeIcon
                className="absolute text-secondary top-[50%] -translate-y-[50%] left-3"
                icon={faUser}
              />
            }
            helperText={userHelperText}
          />
          <SimpleInput
            id="password"
            className="input-control dark:text-white"
            label="Contraseña"
            inputProps={{
              className: "input border-none submit !pl-8 w-full",
              value: password,
              onChange: handlePassword,
              type: !showPassword ? "password" : "string",
            }}
            leftIcon={
              <button
                tabIndex={-1}
                type="button"
                name="toggle-see-password"
                onClick={toggleShowPassword}
                className="absolute text-secondary top-[50%] -translate-y-[50%] left-3 !p-0"
                aria-label="click para alternar ver/ocultar contraseña"
              >
                <FontAwesomeIcon icon={showPassword ? faLockOpen : faLock} />
              </button>
            }
            helperText={passwordHelperText}
          />
          <Switch
            id="remember"
            value={remember}
            onChange={handleRemember}
            label="Recordarme"
            className="dark:text-white"
          />

          <div className="w-full flex gap-5 justify-end items-center">
            <button
              name="login"
              type="submit"
              aria-label="Click para entrar"
              className="secondary submit"
            >
              Siguiente
            </button>
          </div>
        </form>
      )}
    </main>
  );
}

export default SignIn;
