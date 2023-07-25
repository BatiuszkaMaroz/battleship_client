import { Box, Button } from '@mui/material';
import React from 'react';

import Layout from 'components/Layout';
import { BOARD_SIZE } from 'config/constants';
import Ship from './Ship';
import ShipGrid from './ShipGrid';
import { useShipStore } from './useShipStore';

export default function StartPageMenu() {
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
        <Ship
          key={s.id}
          shipId={s.id}
          shipSize={s.size}
          cellSize={cellSizePx}
          shipCellIndex={s.cellIndex}
        />
      ))}
    </>
  );
}
