import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import QuizLayout from './components/QuizLayout.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import App from "./App.jsx";
import History from './components/History.jsx';
import QuizDetails from './components/QuizDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <QuizLayout />
      },
      {
        path: "history",
        element: < History />
      },
      {
        path: "details/:id",
        element: <QuizDetails />
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage />   // Error page component
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
