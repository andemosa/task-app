import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "@/components/ui/toaster";

import App from "./App.tsx";

import CustomSWR from "./context/SWRConfig.tsx";
import DialogDisplayProvider from "./context/DialogDisplayContext";
import ModalProvider from "./context/ModalContext.tsx";
import AuthProvider from "./context/AuthContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CustomSWR>
        <ModalProvider>
          <DialogDisplayProvider>
            <>
              <App />
              <Toaster />
            </>
          </DialogDisplayProvider>
        </ModalProvider>
      </CustomSWR>
    </AuthProvider>
  </React.StrictMode>
);
