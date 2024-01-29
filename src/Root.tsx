import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Grow } from '@mui/material';
import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorPage from 'components/ErrorPage';
import { theme } from 'config/theme';
import { SnackbarProvider } from 'notistack';
import HomePage from 'pages/home/HomePage';

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
      <SnackbarProvider
        TransitionComponent={Grow}
        transitionDuration={250}
        autoHideDuration={5000}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
