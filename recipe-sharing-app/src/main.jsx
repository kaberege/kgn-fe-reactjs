import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import RecipeDetails from './components/RecipeDetails';
import Layout from './components/Layout.jsx';
//import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<App />} />
      <Route path='recipes/:id' element={<RecipeDetails />} />
    </Route>
  )
);

/*
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />
      },
      {
        path: 'recipes/:id',
        element: <RecipeDetails />,
      }
    ]
  }

]);
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
