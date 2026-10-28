import ReactDOM from "react-dom/client";

// app
import { App, AppProviders } from "@/app";

// app styles
import "@/styles/global.css";

// fonts
import "@fontsource/poppins/700.css";
import "@fontsource/roboto/500.css";

// i18
import "@/i18";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");

ReactDOM.createRoot(root).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
