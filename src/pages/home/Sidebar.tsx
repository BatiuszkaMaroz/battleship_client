import { Drawer, Toolbar } from '@mui/material';
import React from 'react';

type SidebarProps = {
  open: boolean;
};

export default function Sidebar({ open }: SidebarProps) {
  const drawerWidth = 340;

  return (
    <Drawer
      open={open}
      variant='persistent'
      anchor='right'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'all 0.3s ease-in-out !important',
        },
      }}
    >
      <Toolbar />
      <h1>HELLO!</h1>
    </Drawer>
  );
}
