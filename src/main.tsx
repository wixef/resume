import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// Требование из ТЗ: при запуске лог в консоль.
// Появится в консоли браузера при открытии сайта / запуске dev-сервера.
console.log("Олег — frontend / backend разработчик");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
