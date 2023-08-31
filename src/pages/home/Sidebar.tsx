import { Drawer, Toolbar } from '@mui/material';
import React from 'react';

type SidebarProps = {
  open: boolean;
};

export default function Sidebar({ open }: SidebarProps) {
  const drawerWidth = 240;

  return (
    <Drawer
      open={open}
      variant='persistent'
      anchor='left'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <h1>HELLO!</h1>
    </Drawer>
  );
}
