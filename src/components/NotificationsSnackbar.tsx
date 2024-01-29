import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { useNotificationsStore } from 'stores/useNotificationsStore';

export default function NotificationsSnackbar() {
  const [open, setOpen] = React.useState(false);
  const { notifications } = useNotificationsStore();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    if (notifications.length > 0) {
      setOpen(true);
    }
  }, [notifications]);

  const latest = notifications[0];
  if (!latest) {
    return null;
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={latest.severity}
        sx={{ width: '100%' }}
      >
        {latest.content}
      </Alert>
    </Snackbar>
  );
}
