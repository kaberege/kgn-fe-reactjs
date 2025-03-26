import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import TripForm from './components/TripForm.tsx'
import ErrorPage from './components/ErrorPage.tsx'
import MapView from './components/MapView.tsx'
import ELDLogView from './components/ELDLogView.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />   // Register page component
  },
  {
    path: "/login",
    element: <Login />   // Login page component
  },
  {
    path: "/truck/",
    element: <App />,   // Main app component
    children: [
      {
        path: "",
        element: <TripForm />     //  component
      },
      {
        path: "map",
        element: <MapView/>  // component
      },
      {
        path: "eld-log/:cycleId",
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
