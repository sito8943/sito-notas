import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createCookie } from "some-javascript-utils/browser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faLockOpen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// contexts
import { useUser } from "../../contexts/UserProvider";
import { useNotification } from "../../contexts/NotificationProvider";

// components
import Button from "../../components/Button/Button";
import Switch from "../../components/Switch/Switch";
import Loading from "../../components/Loading/Loading";
import ModeButton from "../../components/FAB/ModeButton";
import IconButton from "../../components/IconButton/IconButton";
import SimpleInput from "../../components/SimpleInput/SimpleInput";

// services
import { login } from "../../services/auth";

// utils
import { logUser } from "../../utils/auth";

import config from "../../config";

// images
import logo from "../../assets/images/logo.png";

// images
import noPhoto from "../../assets/images/no-photo.webp";

function SignUp() {
  const { setNotificationState } = useNotification();

  const [email, setEmail] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");

  const handleEmail = setEmail(e.target.value);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const handlePassword = setPassword(e.target.value);

  const toggleShowPassword = setShowPassword((oldValue) => !oldValue);

  const [rPassword, setRPassword] = useState("");
  const [showRPassword, setShowRPassword] = useState(false);

  const handleRPassword = setRPassword(e.target.value);

  const toggleShowRPassword = setShowRPassword((oldValue) => !oldValue);

  const navigate = useNavigate();

  const { userState, setUserState } = useUser();

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
      setEmailHelperText("");
      setPasswordHelperText("");
      e.preventDefault();
      if (!user.length) {
        document.getElementById("email")?.focus();
        setEmailHelperText("Debes introducir un email");
        return;
      }
      if (!password.length) {
        document.getElementById("password")?.focus();
        setPasswordHelperText("Debes introducir tu contraseña");
        return;
      }
      try {
        setLoading(true);
        const response = await login(email, password, remember);
        const { data, error } = response;
        if (!error) {
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
        } else throw error;
      } catch (err) {
        console.error(err);
        const { response } = err;
        if (String(err) === "AuthApiError: Invalid login credentials")
          showNotification("error", "Usuario o contraseña incorrecta");
        else if (String(err) === "AxiosError: Network Error")
          showNotification("error", errors.notConnected);
        else if (response) {
          const { status } = response;
          switch (status) {
            case 401:
              showNotification("error", "Ya existe una cuenta con ese email");
              break;
            default:
              showNotification("error", String(err));
              break;
          }
        } else showNotification("error", String(err));
      }
      setLoading(false);
    },
    [email, password, showNotification, navigate, remember, setUserState]
  );

  useEffect(() => {
    if (userState.user) navigate("/");
  }, []);

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
          <div className="flex gap-2 items-center">
            <img src={logo} alt="stick notes logo" className="w-10 h-10" />
            <h1 className="text-sdark dark:text-secondary uppercase">
              Sito Notas
            </h1>
          </div>
          <SimpleInput
            id="email"
            className="input-control dark:text-white"
            label="Email"
            inputProps={{
              className: "input border-none submit !pl-8 w-full",
              value: email,
              onChange: handleEmail,
              type: "email",
            }}
            leftIcon={
              <FontAwesomeIcon
                className="absolute text-secondary top-[50%] -translate-y-[50%] left-3"
                icon={faEnvelope}
              />
            }
            helperText={emailHelperText}
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
              <IconButton
                tabIndex={-1}
                type="button"
                name="toggle-see-password"
                onClick={toggleShowPassword}
                icon={showPassword ? faLockOpen : faLock}
                className="absolute text-secondary top-[50%] -translate-y-[50%] left-3 !p-0 -ml-[12px]"
                aria-label="click para alternar ver/ocultar contraseña"
              />
            }
            helperText={passwordHelperText}
          />
          <SimpleInput
            id="rPassword"
            className="input-control dark:text-white"
            label="Repetir Contraseña"
            inputProps={{
              className: "input border-none submit !pl-8 w-full",
              value: rPassword,
              onChange: handleRPassword,
              type: !showRPassword ? "password" : "string",
            }}
            leftIcon={
              <IconButton
                tabIndex={-1}
                type="button"
                name="toggle-see-r-password"
                onClick={toggleShowRPassword}
                icon={showRPassword ? faLockOpen : faLock}
                className="absolute text-secondary top-[50%] -translate-y-[50%] left-3 !p-0 -ml-[12px]"
                aria-label="click para alternar ver/ocultar repetir contraseña"
              />
            }
          />

          <p className="dark:text-white">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/auth/"
              className="underline hover:text-sdark dark:hover:text-secondary"
            >
              Iniciar sesión
            </Link>
          </p>
          <div className="w-full flex gap-5 justify-end items-center">
            <Button
              name="login"
              type="submit"
              aria-label="Click para entrar"
              className="secondary submit"
            >
              Siguiente
            </Button>
          </div>
        </form>
      )}
    </main>
  );
}

export default SignUp;
