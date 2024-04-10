import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { Toaster } from "@/components/ui/toaster";

import App from "./App.tsx";

import { store } from "./store/index.ts";
import "./index.css";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <>
          <App />
          <Toaster />
        </>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
