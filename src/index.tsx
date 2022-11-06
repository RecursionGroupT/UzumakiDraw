import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { KonvaContextProvider } from "./context/KonvaContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <KonvaContextProvider>
        <App />
      </KonvaContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
