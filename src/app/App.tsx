import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppRoute } from "@/shared/routes";
import loadable from "@loadable/component";
import { useTranslation } from "react-i18next";

// providers
import { useAccount } from "@/features/auth";

// layouts
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { ViewLayout } from "@/app/layouts/ViewLayout";

// components
import { ErrorHandler } from "@/shared/components/organisms/ErrorHandler";
import { PwaUpdateDialog } from "@/shared/components/organisms/PwaUpdateDialog";
import { SplashScreen } from "@/shared/components/organisms/SplashScreen";

import "./styles.css";

// views
// Auth
const SignIn = loadable(() => import("@/features/auth/pages/SignIn/SignIn"));
const SignOut = loadable(() => import("@/features/auth/pages/SignOut/SignOut"));
const Recovery = loadable(
  () => import("@/features/auth/pages/Recovery/Recovery"),
);
const UpdatePassword = loadable(
  () => import("@/features/auth/pages/UpdatePassword/UpdatePassword"),
);
// Generals
const Home = loadable(() => import("@/features/notes/pages/Home/Home"));
const NotFound = loadable(() => import("@/app/pages/NotFound/NotFound"));
const Note = loadable(() => import("@/features/notes/pages/Note/Note"));
const Trash = loadable(() => import("@/features/notes/pages/Trash/Trash"));
const Tags = loadable(() => import("@/features/notes/pages/Tags/Tags"));
const Settings = loadable(
  () => import("@/features/settings/pages/Settings/Settings"),
);

function App() {
  const [loaded, setLoaded] = useState(true);
  const { t } = useTranslation();

  const { restoreSession } = useAccount();

  useEffect(() => {
    restoreSession();
    setTimeout(() => {
      setLoaded(false);
    }, 1000);
  }, [restoreSession]);

  return (
    <Suspense>
      <ErrorHandler>
        <SplashScreen
          visible={loaded}
          label={t("_accessibility:appName")}
          logo={
            <div>
              <h1 className="app-splash-title">
                {t("_accessibility:appName")}
              </h1>
            </div>
          }
        />
        <PwaUpdateDialog />
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Auth} element={<AuthLayout />}>
              <Route index element={<SignIn />} />
              <Route path={AppRoute.Recovery} element={<Recovery />} />
              <Route
                path={AppRoute.UpdatePassword}
                element={<UpdatePassword />}
              />
            </Route>
            <Route path={AppRoute.Home} element={<ViewLayout />}>
              <Route index element={<Home />} />
              <Route path={AppRoute.Note} element={<Note />} />
              <Route path={AppRoute.Trash} element={<Trash />} />
              <Route path={AppRoute.Tags} element={<Tags />} />
              <Route path={AppRoute.Settings} element={<Settings />} />
            </Route>

            <Route path={AppRoute.SignOut} element={<SignOut />} />
            <Route path={AppRoute.NotFound} element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorHandler>
    </Suspense>
  );
}

export default App;
