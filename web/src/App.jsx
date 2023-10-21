import React, { useState, useEffect, useCallback, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";

// layouts
import Auth from "./layouts/Auth";
import View from "./layouts/View/View";
import NoteView from "./layouts/NoteView/NoteView";

// contexts
import { useMode } from "./contexts/ModeProvider";
import { useUser } from "./contexts/UserProvider.jsx";
import { useNotification } from "./contexts/NotificationProvider";

// components
import Loading from "./components/Loading/Loading";
import Notification from "./components/Notification/Notification";
import Handler from "./components/Error/Handler";

// services
import { validateUser } from "./services/auth";

// lazy load
const Workspace = loadable(() => import("./views/Workspace/Workspace"));
const NotFound = loadable(() => import("./views/NotFound/NotFound"));
const SignOut = loadable(() => import("./views/Auth/SignOut"));
const SignIn = loadable(() => import("./views/Auth/SignIn"));
const SignUp = loadable(() => import("./views/Auth/SignUp"));
const Home = loadable(() => import("./views/Home/Home"));

function App() {
  const { setModeState } = useMode();
  const { setNotificationState } = useNotification();
  const { userState, setUserState } = useUser();

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
      const { data, error } = await validateUser();
      if (data.user !== null)
        setUserState({ type: "logged-in", user: data.user });
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
            break;
          default:
            showNotification("error", String(err));
            break;
        }
      } else showNotification("error", String(err));
      showNotification("error", String(err));
      setLoading(false);
    }
    setLoading(false);
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
    fetch();
  }, []);

  return (
    <Suspense>
      <Handler>
        <Notification />
        {!loading ? (
          <BrowserRouter>
            <Routes>
              <Route exact path="/auth" element={<Auth />}>
                <Route index element={<SignIn />} />
                <Route path="/auth/sign-up" element={<SignUp />} />
              </Route>
              {userState.user ? (
                <Route path="/" element={<NoteView />}>
                  <Route index element={<Workspace />} />
                </Route>
              ) : (
                <Route path="/" element={<View />}>
                  <Route index element={<Home />} />
                </Route>
              )}

              <Route exact path="/sign-out" element={<SignOut />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <Loading className="w-full h-screen fixed top-0 left-0 z-40" />
        )}
      </Handler>
    </Suspense>
  );
}

export default App;
