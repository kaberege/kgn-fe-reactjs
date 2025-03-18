import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import TripForm from './components/TripForm.tsx'
import ErrorPage from './components/ErrorPage.tsx'
import MapPage from './components/MapPage.tsx'
import ELDLogView from './components/ELDLogView.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,   // Main app component
    children: [
      {
        path: "",
        element: <TripForm />     //  component
      },
      {
        path: "map",
        element: <MapPage />  // component
      },
      {
        path: "eld-log",
        element: <ELDLogView />     //  component
      },
    ]
  },
  {
    path: "*",
    element: <ErrorPage />   // Error page component
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
