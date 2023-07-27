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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Board cellId='setting-cell' cellPxSize={cellPxSize} />
          <Button sx={{ mt: 2 }} onClick={randomizeShips}>
            RANDOMIZE
          </Button>
        </Box>
      </Layout>
      {ships.map((s) => (
        <ShipComponent key={s.id} ship={s} cellPxSize={cellPxSize} />
      ))}
    </>
  );
}
