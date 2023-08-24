import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { socket } from 'services/socketService';

export default function LobbyPage() {
  const leaveLobby = () => {
    socket.emit('room-leave');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 8,
      }}
    >
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>Serching opponent...</Typography>
      <Button sx={{ mt: 4 }} onClick={leaveLobby}>
        Leave lobby
      </Button>
    </Box>
  );
}
