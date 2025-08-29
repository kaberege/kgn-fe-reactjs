import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.tsx";
import ErrorMessage from "./components/ErrorMessage.tsx";
import WeatherCard from "./components/WeatherCard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <WeatherCard />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorMessage />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
