import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppRoute } from "../shared/routes";
import loadable from "@loadable/component";
import { useTranslation } from "react-i18next";

// providers
import { useAccount } from "../features/auth";

// layouts
import { AuthLayout as Auth } from "./layouts/AuthLayout";
import { ViewLayout as View } from "./layouts/ViewLayout";

// components
import { ErrorHandler } from "../shared/components/organisms/ErrorHandler";
import { SplashScreen } from "../shared/components/organisms/SplashScreen";

// views
// Auth
const SignIn = loadable(() => import("../features/auth/pages/SignIn/SignIn"));
const SignOut = loadable(
  () => import("../features/auth/pages/SignOut/SignOut"),
);
const Recovery = loadable(
  () => import("../features/auth/pages/Recovery/Recovery"),
);
const UpdatePassword = loadable(
  () => import("../features/auth/pages/UpdatePassword/UpdatePassword"),
);
// Generals
const Home = loadable(() => import("../features/notes/pages/Home/Home"));
const NotFound = loadable(() => import("./pages/NotFound/NotFound"));
const Note = loadable(() => import("../features/notes/pages/Note/Note"));
const Settings = loadable(
  () => import("../features/settings/pages/Settings/Settings"),
);

function App() {
  const [loaded, setLoaded] = useState(true);
  const { t } = useTranslation();

  const { logUserFromLocal } = useAccount();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    logUserFromLocal();
    setTimeout(() => {
      setLoaded(false);
    }, 1000);
  }, [logUserFromLocal]);

  return (
    <Suspense>
      <ErrorHandler>
        <SplashScreen
          visible={loaded}
          label={t("_accessibility:appName")}
          logo={
            <div>
              <h1 className="uppercase">{t("_accessibility:appName")}</h1>
            </div>
          }
        />
        <BrowserRouter>
          <Routes>
            <Route exact path={AppRoute.Auth} element={<Auth />}>
              <Route index element={<SignIn />} />
              <Route path={AppRoute.Recovery} element={<Recovery />} />
              <Route
                path={AppRoute.UpdatePassword}
                element={<UpdatePassword />}
              />
            </Route>
            <Route path={AppRoute.Home} element={<View />}>
              <Route index element={<Home />} />
              <Route path={AppRoute.Note} element={<Note />} />
              <Route path={AppRoute.Settings} element={<Settings />} />
            </Route>

            <Route exact path={AppRoute.SignOut} element={<SignOut />} />
            <Route path={AppRoute.NotFound} element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorHandler>
    </Suspense>
  );
}

export default App;
