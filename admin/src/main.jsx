import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.jsx";
import SubAdminContextProvider from "./context/SubAdminContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <SubAdminContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </SubAdminContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
