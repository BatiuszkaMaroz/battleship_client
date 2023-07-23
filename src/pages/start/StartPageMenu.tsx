import { Box } from '@mui/material';
import React from 'react';
import Ship from './Ship';

export default function StartPageMenu() {
  return (
    <div>
      <h1>Hello world!</h1>
      <Box height={60} width={60} border='solid 2px brown' id='cell' />
      <Box height={60} width={60} border='solid 2px brown' id='cell' />
      <Box height={60} width={60} border='solid 2px brown' id='cell' />
      <Ship />
    </div>
  );
}
