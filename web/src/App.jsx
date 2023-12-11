import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";

// layouts
import Auth from "./layouts/Auth";
import View from "./layouts/View/View";

// @sito/ui
import { Handler, SplashScreen, Notification, useNotification } from "@sito/ui";

// services
import { refresh, validateUser } from "./services/auth";

// context
import { useUser } from "./providers/UserProvider";

// auth cache
import {
  cachedUser,
  getUser,
  logoutUser,
  remember,
  saveUser,
} from "./utils/auth";

// lang
import { showError } from "./lang/es";

// views
const SignIn = loadable(() => import("./views/Auth/SignIn"));
const SignOut = loadable(() => import("./views/Auth/SignOut"));
const SignUp = loadable(() => import("./views/Auth/SignUp"));
const Home = loadable(() => import("./views/Home/Home"));
const NotFound = loadable(() => import("./views/NotFound/NotFound"));
const Note = loadable(() => import("./views/Note/Note"));
const Settings = loadable(() => import("./views/Settings/Settings"));

function App() {
  const { setUserState } = useUser();
  const { setNotification } = useNotification();

  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      const { data, error } = await validateUser();
      if (error && cachedUser()) {
        if (error.message === "invalid claim: missing sub claim") {
          const rememberValue = remember();
          if (rememberValue !== null) {
            const response = await refresh(getUser().user.email, rememberValue);
            if (response.error) {
              logoutUser();
              setNotification({
                type: "error",
                message: showError(response.error.message),
              });
              return;
            }
            const { user, photo = {} } = response.data;
            setUserState({
              type: "logged-in",
              user,
              photo,
            });
            saveUser({ user, photo });
          } else {
            logoutUser();
          }
        } else {
          setUserState({ type: "logged-in", user: getUser(), cached: true });
        }
      } else if (!error) {
        const user = data.user;
        saveUser({ ...getUser(), user, cached: false });
        setUserState({ type: "logged-in", user });
      }
    } catch (err) {
      logoutUser();
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense>
      <Handler>
        <Notification />
        <SplashScreen
          visible={loading}
          logo={
            <div>
              <h1>SITO NOTAS</h1>
            </div>
          }
        />
        {!loading ? (
          <BrowserRouter>
            <Routes>
              <Route exact path="/auth" element={<Auth />}>
                <Route index element={<SignIn />} />
                <Route path="/auth/sign-up" element={<SignUp />} />
              </Route>
              <Route path="/" element={<View />}>
                <Route index element={<Home />} />
                <Route path="/note/:id" element={<Note />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              <Route exact path="/sign-out" element={<SignOut />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        ) : null}
      </Handler>
    </Suspense>
  );
}

export default App;
