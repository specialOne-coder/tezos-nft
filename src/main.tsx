import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import EuroTzProvider from "./context/EurotzContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EuroTzProvider>
      <App />
    </EuroTzProvider>
  </React.StrictMode>
);
