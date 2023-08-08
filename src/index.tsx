import "./styles/index.scss";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/store";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

declare global {
    interface Window {
        Cypress?: unknown;
        store?: unknown;
    }
}

if (window.Cypress) {
    window.store = store;
}
