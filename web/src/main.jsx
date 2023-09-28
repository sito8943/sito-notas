import React from "react";
import ReactDOM from "react-dom/client";

// contexts
import { ModeProvider } from "./contexts/ModeProvider";
import { UserProvider } from "./contexts/UserProvider";
import { NotificationProvider } from "./contexts/NotificationProvider";

// app
import App from "./App.jsx";

// styles
import "./index.css";
// animations
import "./assets/animations/appear.css";
import "./assets/animations/grow.css";
import "./assets/animations/shake.css";
// Import css files
import "tippy.js/dist/tippy.css"; // optional

// fonts
import "@fontsource/poppins";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ModeProvider>
    <NotificationProvider>
      <NotificationProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NotificationProvider>
    </NotificationProvider>
  </ModeProvider>
);
