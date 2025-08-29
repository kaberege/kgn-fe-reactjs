import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.tsx";
import TripForm from "./components/TripForm.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import MapView from "./components/MapView.tsx";
import ELDLogView from "./components/ELDLogView.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import History from "./components/History.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Register, // Register page component
  },
  {
    path: "/login",
    Component: Login, // Login page component
  },
  {
    path: "/truck/",
    Component: App, // Main app component
    children: [
      {
        index: true,
        Component: TripForm, //  component TripForm
      },
      {
        path: "map",
        Component: MapView, // component MapView
      },
      {
        path: "eld-log/:cycleId",
        Component: ELDLogView, // component ELDLogView
      },
      {
        path: "history",
        Component: History, // component History
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage, // Error page component
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
