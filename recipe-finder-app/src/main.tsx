import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import RecipeCard from './components/RecipeCard.tsx'
import RecipeDetails from './components/RecipeDetails.tsx'
import ErrorPage from './components/ErrorPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,   // Main app component
    children: [
      {
        path: "",
        element: <RecipeCard />     // Recipe card component
      },
      {
        path: "details/:id",
        element: <RecipeDetails />  // Recipe details component
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage/>   // Error page component
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
