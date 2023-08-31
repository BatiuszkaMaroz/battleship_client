import { Box, Button } from '@mui/material';
import React, { useState } from 'react';

import Layout from 'components/Layout';
import { socket } from 'services/socketService';
import { useSettingStore } from 'stores/useSettingStore';
import { UserStatus, useUserStore } from 'stores/useUserStore';
import Board from './Board';
import ShipComponent from './Ship';
import Sidebar from './Sidebar';

export default function HomePage() {
  const cellPxSize = 45;
  const drawerWidth = 380;

  const { ships, randomizeShips } = useSettingStore();
  const { userStatus } = useUserStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const joinPool = () => {
    socket.emit('pool-join', { ships });
  };

  const leavePool = () => {
    socket.emit('pool-leave');
  };

  const leaveRoom = () => {
    socket.emit('room-leave');
  };

  const settingsLocked = userStatus !== UserStatus.IDLE;

  return (
    <Layout>
      <Sidebar open={sidebarOpen} drawerWidth={drawerWidth} />
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 8,
          mr: sidebarOpen ? `${drawerWidth}px` : undefined,
          transitionProperty: 'margin-right',
          transitionDuration: (theme) =>
            theme.transitions.duration.enteringScreen + 'ms',
          transitionTimingFunction: 'ease-in-out',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Board cellId='setting-cell' cellPxSize={cellPxSize}>
            {ships.map((s) => (
              <ShipComponent
                key={s.id}
                ship={s}
                cellPxSize={cellPxSize}
                locked={settingsLocked}
              />
            ))}
          </Board>
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
          <Button sx={{ mt: 2 }} onClick={joinPool}>
            Play
          </Button>
          {userStatus === UserStatus.POOL && (
            <Button sx={{ mt: 2 }} onClick={leavePool}>
              Leave pool
            </Button>
          )}
          {userStatus === UserStatus.ROOM && (
            <Button sx={{ mt: 2 }} onClick={leaveRoom}>
              Leave room
            </Button>
          )}
          <Button onClick={() => setSidebarOpen((v) => !v)}>
            Open sidebar
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
