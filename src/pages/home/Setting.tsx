import { Box, Button, CircularProgress } from '@mui/material';
import React from 'react';

import { socket } from 'services/socketService';
import { useSettingStore } from 'stores/useSettingStore';
import { UserStatus, useUserStore } from 'stores/useUserStore';
import SettingBoard from './SettingBoard';
import SettingShip from './SettingShip';

export default function Setting() {
  const cellPxSize = 45;

  const { ships, randomizeShips } = useSettingStore();
  const { userStatus } = useUserStore();

  const joinPool = () => {
    socket.emit('pool-join', { ships });
  };

  const leavePool = () => {
    socket.emit('pool-leave');
  };

  const inPool = userStatus !== UserStatus.IDLE;

  return (
    <Box sx={{ display: 'flex', gap: 8 }}>
      {/* ==================== LEFT ==================== */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SettingBoard cellId='setting-cell' cellPxSize={cellPxSize}>
          {ships.map((s) => (
            <SettingShip
              key={s.id}
              ship={s}
              cellPxSize={cellPxSize}
              locked={inPool}
            />
          ))}
        </SettingBoard>
        <Button sx={{ mt: 2 }} onClick={randomizeShips} disabled={inPool}>
          Randomize
        </Button>
      </Box>
      {/* ==================== RIGHT ==================== */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SettingBoard cellPxSize={cellPxSize}>
          {inPool && (
            <CircularProgress
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                margin: 'auto',
              }}
            />
          )}
        </SettingBoard>
        <Button sx={{ mt: 2 }} onClick={joinPool} disabled={inPool}>
          Play
        </Button>
        {inPool && (
          <Button sx={{ mt: 2 }} onClick={leavePool}>
            Leave pool
          </Button>
        )}
      </Box>
    </Box>
  );
}
