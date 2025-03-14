import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./context/redux/store";
import ErrorBoundary from "./components/Errors/ErrorBoundary";
import "./components/Errors/globalErrorHandler";

// src/index.js or equivalent
window.onerror = (message, source, lineno, colno, error) => {
  console.error("Global error handler:", error);
  return true; // Prevent React error overlay
};

window.onunhandledrejection = (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  return true; // Prevent React error overlay
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
