import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { blue, pink } from '@mui/material/colors';
import createTheme from '@mui/material/styles/createTheme';

export const theme = createTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});
