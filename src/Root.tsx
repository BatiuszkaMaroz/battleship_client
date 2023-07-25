import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import ErrorPage from 'components/ErrorPage';
import { theme } from 'config/theme';
import HomePage from 'features/home/components/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
]);

export default function Root() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
