import { Box, Button } from '@mui/material';
import React from 'react';

import Layout from 'components/Layout';
import Board from './components/Board';
import ShipComponent from './components/Ship';
import { useShipStore } from './utils/useShipStore';

export default function HomePage() {
  const cellPxSize = 50;
  const { ships, randomizeShips } = useShipStore();

  const startGame = () => {
    console.log('start game');
  };

  return (
    <>
      <Layout>
        <Box sx={{ mt: 8, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Board cellId='setting-cell' cellPxSize={cellPxSize} />
            <Button sx={{ mt: 2 }} onClick={randomizeShips}>
              Randomize
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Board cellPxSize={cellPxSize} />
            <Button sx={{ mt: 2 }} onClick={startGame}>
              Play
            </Button>
          </Box>
        </Box>
      </Layout>
      {ships.map((s) => (
        <ShipComponent key={s.id} ship={s} cellPxSize={cellPxSize} />
      ))}
    </>
  );
}
