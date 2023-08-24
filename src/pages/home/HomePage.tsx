import { Box, Button } from '@mui/material';
import React, { useEffect } from 'react';

import { socket } from 'services/socketService';
import { useSettingStore } from 'stores/useSettingStore';
import { useUserStore } from 'stores/useUserStore';
import Board from './Board';
import ShipComponent from './Ship';

export default function HomePage() {
  const cellPxSize = 50;
  const { ships, randomizeShips } = useSettingStore();
  const { userId: id, username } = useUserStore();

  const startGame = () => {
    socket.emit('room-join', { ships });
  };

  useEffect(() => {
    console.log(id, username);
  }, [id, username]);

  return (
    <>
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
      {ships.map((s) => (
        <ShipComponent key={s.id} ship={s} cellPxSize={cellPxSize} />
      ))}
    </>
  );
}
