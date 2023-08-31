import Email from '@mui/icons-material/Email';
import Notifications from '@mui/icons-material/Notifications';
import { Button, Divider, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function Layout({ children }: React.PropsWithChildren) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='relative'
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Material Ships
            </Typography>
            <IconButton size='large' color='inherit'>
              <Notifications />
            </IconButton>
            <IconButton size='large' color='inherit'>
              <Email />
            </IconButton>
            <Divider
              orientation='vertical'
              sx={{
                mx: 2,
                height: 28,
                borderColor: 'white',
              }}
            />
            <Button color='inherit'>Claim account</Button>
          </Toolbar>
        </AppBar>
        <Container>{children}</Container>
      </Box>
    </>
  );
}
