import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any;

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error?.name;

  const message = isRouteErrorResponse(error)
    ? error?.error?.message
    : error?.message;

  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant='h1'>Oops!</Typography>
      <Typography variant='subtitle1'>{title}</Typography>
      {message && <Typography variant='subtitle1'>{message}</Typography>}
      <Button sx={{ mt: 4 }} href='/' variant='contained'>
        Go to home page
      </Button>
    </Box>
  );
}
