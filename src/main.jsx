import ReactDOM from "react-dom/client";

// app
import { App, AppProviders } from "./app";

// app styles
import "./styles/global.css";

// fonts
import "@fontsource/poppins/700.css";
import "@fontsource/roboto/500.css";

// i18
import "./i18.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
