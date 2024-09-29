import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import QuizLayout from './components/QuizLayout.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import App from "./App.jsx"
import History from './components/History.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="" element={<QuizLayout />} />
      <Route path="history" element={<History />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
