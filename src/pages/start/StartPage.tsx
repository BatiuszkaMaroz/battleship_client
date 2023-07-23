import { Box } from '@mui/material';

import Layout from 'components/Layout';
import React from 'react';
import Ship from './Ship';
import ShipGrid from './ShipGrid';

export default function StartPageMenu() {
  const gridSize = 10;
  const cellSize = 50;

  const ships = [
    { id: '0', size: 4 },
    { id: '1', size: 3 },
    { id: '2', size: 3 },
    { id: '3', size: 2 },
    { id: '4', size: 2 },
    { id: '5', size: 2 },
    { id: '6', size: 1 },
    { id: '7', size: 1 },
    { id: '8', size: 1 },
    { id: '9', size: 1 },
  ];

  console.log(ships);

  return (
    <>
      <Layout>
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            width: '100%',
            backgroundColor: '#f0f0f0',
          }}
        >
          <ShipGrid gridSize={gridSize} cellSize={cellSize} />
        </Box>
      </Layout>
      {ships.map((s) => (
        <Ship key={s.id} size={s.size} cellSize={cellSize} />
      ))}
    </>
  );
}
