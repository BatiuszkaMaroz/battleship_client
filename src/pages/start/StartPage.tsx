import { Box } from '@mui/material';
import React from 'react';

import Layout from 'components/Layout';
import Ship from './Ship';
import ShipGrid from './ShipGrid';
import { useShipStore } from './useShipStore';

export default function StartPageMenu() {
  const gridSize = 10;
  const cellSize = 50;

  const { ships } = useShipStore();

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
        <Ship
          key={s.id}
          shipId={s.id}
          shipSize={s.size}
          cellSize={cellSize}
          shipCellIndex={s.cellIndex}
        />
      ))}
    </>
  );
}
