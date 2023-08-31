import { Send } from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
} from '@mui/material';
import React from 'react';

type SidebarProps = {
  drawerWidth: number;
  open: boolean;
};

export default function Sidebar({ open, drawerWidth }: SidebarProps) {
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
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder='Aa'
            variant='outlined'
            fullWidth
            multiline
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton sx={{ p: 0 }} disableRipple>
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Drawer>
  );
}
