import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker-v1.js")
      .then((registration) => {
        console.log("Service Worker registered: ");
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
root.render(<App />);

reportWebVitals();
