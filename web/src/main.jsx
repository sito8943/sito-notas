import React from "react";
import ReactDOM from "react-dom/client";

// components
import { NotificationProvider } from "./contexts/NotificationProvider";

// app
import App from "./App.jsx";

// styles
import "./index.css";
// animations
import "./assets/animations/appear.css";
import "./assets/animations/grow.css";
import "./assets/animations/shake.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
);
