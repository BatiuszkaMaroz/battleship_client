import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { useMessagesStore } from 'shared/stores/useMessagesStore';

export default function MessagesSnackbar() {
  const [open, setOpen] = React.useState(false);
  const { messages } = useMessagesStore();

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
    if (messages.length > 0) {
      setOpen(true);
    }
  }, [messages]);

  const latestMessage = messages[0];
  if (!latestMessage) {
    return null;
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={latestMessage.severity}
        sx={{ width: '100%' }}
      >
        {latestMessage.content}
      </Alert>
    </Snackbar>
  );
}
