import StartPage from 'home/StartPage';
import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <StartPage />,
      },
    ],
  },
]);

export default function Root() {
  return <RouterProvider router={router} />;
}
