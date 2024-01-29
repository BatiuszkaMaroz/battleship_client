import { MoreVert, Send } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';

type SidebarProps = {
  drawerWidth: number;
  open: boolean;
};

export default function GameSidebar({ open, drawerWidth }: SidebarProps) {
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
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2, width: 48, height: 48 }} />
            <Box>
              <Typography variant='h6'>Username</Typography>
              <Typography variant='body2'>Ranking</Typography>
            </Box>
          </Box>
          <Box>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            flexGrow: 1,
          }}
        ></Box>
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
