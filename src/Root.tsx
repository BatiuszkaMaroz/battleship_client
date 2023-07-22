import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import ErrorPage from 'components/ErrorPage';
import { theme } from 'config/theme';
import StartPage from 'features/start/StartPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <StartPage />,
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
