import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import AppDie from "./components/dieTask/AppDie.jsx"
import ToDo from './components/todoTask/ToDo.jsx';
import Home from "./components/home/Home.jsx";
import App from './App.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="todo" element={<ToDo />} />
      <Route path="die" element={<AppDie />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
