import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "./presentation/contexts";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./config/firebase.config.ts";

import App from "./App.tsx";

import "./styles/reset.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <App />
      </FirebaseAppProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
