import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
          color: '#000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          fontSize: '0.875rem',
        },
        contained: {
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:disabled': {
            backgroundColor: '#e0e0e0',
            color: '#9e9e9e',
          },
        },
      },
    },
  },
});

export default theme;