import { Box, Button } from '@mui/material';
import React from 'react';

import { socket } from 'services/socketService';
import GameRivalBoard from './GameRivalBoard';
import GameUserBoard from './GameUserBoard';

export default function Game() {
  const cellPxSize = 45;

  const leaveGame = () => {
    socket.emit('room-leave');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 8 }}>
        <Box>
          <GameUserBoard cellPxSize={cellPxSize} />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <GameRivalBoard cellPxSize={cellPxSize} />
          <Button sx={{ mt: 2 }} onClick={leaveGame}>
            Leave Game
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
