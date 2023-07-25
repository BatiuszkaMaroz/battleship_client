import { Box, Button } from '@mui/material';
import React from 'react';

import Layout from 'components/Layout';
import { BOARD_SIZE } from 'config/constants';
import { useShipStore } from '../utils/useShipStore';
import ShipComponent from './Ship';
import ShipGrid from './ShipGrid';

export default function HomePage() {
  const cellSizePx = 50;

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
          <ShipGrid gridSize={BOARD_SIZE} cellSizePx={cellSizePx} />
          <Button onClick={randomizeShips}>RANDOMIZE</Button>
        </Box>
      </Layout>
      {ships.map((s) => (
        <ShipComponent key={s.id} ship={s} cellSize={cellSizePx} />
      ))}
    </>
  );
}
