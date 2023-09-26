import React, { useState, useEffect, useCallback, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import Auth from "./layouts/Auth";
import View from "./layouts/View";

// views
import NotFound from "./views/NotFound/NotFound";
import SignOut from "./views/Auth/SignOut";
import SignIn from "./views/Auth/SignIn";
import Home from "./views/Home/Home";

// contexts
import { useMode } from "./contexts/ModeProvider";
import { useUser } from "./contexts/UserProvider.jsx";
import { useNotification } from "./contexts/NotificationProvider";

// utils
import { logoutUser, userLogged, fromLocal } from "./utils/auth";

// services
import { validateBasicKey } from "./services/auth";

// components
import Loading from "./components/Loading/Loading";
import Notification from "./components/Notification/Notification";

function App() {
  const { setModeState } = useMode();
  const { setNotificationState } = useNotification();
  const { setUserState } = useUser();

  const [loading, setLoading] = useState(true);

  const showNotification = useCallback(
    (ntype, message) =>
      setNotificationState({
        type: "set",
        ntype,
        message,
      }),
    [setNotificationState]
  );

  const fetch = async () => {
    try {
      const value = await validateBasicKey();
      if (!value) logoutUser();
      else setUserState({ type: "logged-in", user: fromLocal() });
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (String(err) === "AxiosError: Network Error")
        return showNotification("error", errors.notConnected);
      const { response } = err;
      if (response) {
        const { status } = response;
        switch (status) {
          case 403:
          case 401:
            logoutUser();
            break;
          default:
            showNotification("error", String(err));
            break;
        }
      } else showNotification("error", String(err));
      showNotification("error", String(err));
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        localStorage.setItem("theme", "dark");
        setModeState(false);
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setModeState(true);
      }
    } catch (err) {
      console.error(err);
    }
    if (userLogged()) fetch();
    else setLoading(false);
  }, []);

  return (
    <Suspense>
      <Notification />
      {!loading ? (
        <BrowserRouter>
          <Routes>
            <Route exact path="/auth" element={<Auth />}>
              <Route index element={<SignIn />} />
            </Route>
            <Route path="/" element={<View />}>
              <Route index element={<Home />} />
            </Route>
            <Route exact path="/sign-out" element={<SignOut />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <Loading className="w-full h-screen fixed top-0 left-0 z-40" />
      )}
    </Suspense>
  );
}

export default App;
