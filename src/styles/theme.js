import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          marginBottom: '20px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: '10px',
        },
      },
    },
  },
});

export default theme;