import { Box } from '@mui/material';
import React from 'react';

import Layout from 'components/Layout';
import { UserStatus, useUserStore } from 'stores/useUserStore';
import Game from './Game';
import GameSidebar from './GameSidebar';
import Setting from './Setting';

export default function HomePage() {
  const drawerWidth = 380;

  const { userStatus } = useUserStore();

  // FIXME
  // const sidebarOpen = true;
  const sidebarOpen =
    userStatus === UserStatus.ROOM || userStatus === UserStatus.GAME;

  const renderContent = () => {
    // FIXME
    // return <Game />;

    switch (userStatus) {
      case UserStatus.ROOM || UserStatus.GAME:
        return <Game />;
      default:
        return <Setting />;
    }
  };

  return (
    <Layout>
      <GameSidebar open={sidebarOpen} drawerWidth={drawerWidth} />
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
        {renderContent()}
      </Box>
    </Layout>
  );
}
