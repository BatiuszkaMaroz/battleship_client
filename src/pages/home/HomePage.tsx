import { Box, Button } from '@mui/material';
import React from 'react';

import Layout from 'components/Layout';
import { socket } from 'services/socketService';
import { RoomStatus, useRoomStore } from 'stores/useRoomStore';
import { useSettingStore } from 'stores/useSettingStore';
import Board from './Board';
import ShipComponent from './Ship';

export default function HomePage() {
  const cellPxSize = 50;
  const { ships, randomizeShips } = useSettingStore();
  const { roomStatus } = useRoomStore();

  const joinRoom = () => {
    socket.emit('room-join', { ships });
  };

  const leaveRoom = () => {
    socket.emit('room-leave');
  };

  const settingsLocked = roomStatus !== RoomStatus.INACTIVE;

  return (
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
          <Button
            sx={{ mt: 2 }}
            onClick={randomizeShips}
            disabled={settingsLocked}
          >
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
          <Button sx={{ mt: 2 }} onClick={joinRoom}>
            Play
          </Button>
          {settingsLocked && (
            <Button sx={{ mt: 2 }} onClick={leaveRoom}>
              Leave
            </Button>
          )}
        </Box>
      </Box>
      {ships.map((s) => (
        <ShipComponent
          key={s.id}
          ship={s}
          cellPxSize={cellPxSize}
          locked={settingsLocked}
        />
      ))}
    </Layout>
  );
}
