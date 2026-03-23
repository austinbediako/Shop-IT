import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {SnackbarProvider} from 'notistack'

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}> 
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

serviceWorker.unregister();
