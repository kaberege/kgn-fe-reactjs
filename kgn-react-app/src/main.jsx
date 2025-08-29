import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AppDie from "./components/dieTask/AppDie.jsx";
import ToDo from "./components/todoTask/ToDo.jsx";
import Home from "./components/home/Home.jsx";
import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "", element: <ToDo /> },
      { path: "", element: <AppDie /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
