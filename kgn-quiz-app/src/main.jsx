import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import QuizLayout from "./components/QuizLayout.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import App from "./App.jsx";
import History from "./components/History.jsx";
import QuizDetails from "./components/QuizDetails.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: QuizLayout,
      },
      {
        path: "history",
        Component: History,
      },
      {
        path: "details/:id",
        Component: QuizDetails,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage, // Error page component
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
