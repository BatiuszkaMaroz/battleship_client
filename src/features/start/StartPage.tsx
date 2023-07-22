import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function StartPage() {
  const { t } = useTranslation();

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <Typography variant='h1' mb={8}>
        {t('start-page.title')}
      </Typography>
      <Box>
        <TextField
          label={t('start-page.text')}
          InputProps={{
            endAdornment: (
              <IconButton>
                <ArrowForwardIcon />
              </IconButton>
            ),
          }}
        ></TextField>
      </Box>
    </Box>
  );
}
