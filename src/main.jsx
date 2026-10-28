import ReactDOM from "react-dom/client";

// @sito/ui
import { ToastProvider } from "@sito/ui";

// providers
import { ThemeProvider } from "./providers/ThemeProvider";
import { AppApiClientProvider } from "./providers/AppApiProvider.jsx";
import { AccountProvider } from "./providers/AccountProvider.jsx";
import { SearchProvider } from "./providers/SearchProvider.jsx";
import { CacheProvider } from "./providers/CacheProvider.jsx";

// APP
import App from "./App.jsx";

// app styles
import "./index.css";

// fonts
import "@fontsource/poppins/700.css";
import "@fontsource/roboto/500.css";

// i18
import "./i18.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AppApiClientProvider>
      <AccountProvider>
        <CacheProvider>
          <ToastProvider placement="bottom-right">
            <SearchProvider>
              <App />
            </SearchProvider>
          </ToastProvider>
        </CacheProvider>
      </AccountProvider>
    </AppApiClientProvider>
  </ThemeProvider>,
);
