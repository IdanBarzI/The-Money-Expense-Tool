import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AppContextProvider } from "./context/AppContext";

import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
