import { Box, Button } from '@mui/material';
import React from 'react';

import Layout from 'components/Layout';
import { useShipStore } from '../utils/useShipStore';
import Board from './Board';
import ShipComponent from './Ship';

export default function HomePage() {
  const cellPxSize = 50;

  const { ships, randomizeShips } = useShipStore();

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
          <Board cellPxSize={cellPxSize} />
          <Button onClick={randomizeShips}>RANDOMIZE</Button>
        </Box>
      </Layout>
      {ships.map((s) => (
        <ShipComponent key={s.id} ship={s} cellPxSize={cellPxSize} />
      ))}
    </>
  );
}
